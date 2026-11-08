#!/usr/bin/env node
/**
 * Re-render preview/chat-idle.png and preview/chat-thinking.png from
 * demo/index.html using a real (headless) Chrome and the DevTools protocol.
 *
 * Virtual-time capture does not advance requestAnimationFrame, so the fire
 * never ramps to its thinking state. This script waits in real time instead.
 *
 * Usage: node scripts/capture-previews.mjs [path-to-chrome]
 */
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chrome = process.argv[2]
  || process.env.CHROME
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const SHOTS = [
  { file: 'chat-idle.png', query: '', wait: 2500 },
  { file: 'chat-thinking.png', query: '?thinking=1', wait: 4200 },
];

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

async function waitForFile(path, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      return await readFile(path, 'utf8');
    } catch {
      await sleep(100);
    }
  }
  throw new Error(`timed out waiting for ${path}`);
}

async function openTarget(port, url) {
  const endpoint = `http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const response = await fetch(endpoint, { method: 'PUT' });
      if (response.ok) return await response.json();
    } catch {
      // Chrome is still starting.
    }
    await sleep(100);
  }
  throw new Error('could not open a DevTools target');
}

function connect(url) {
  const socket = new WebSocket(url);
  let sequence = 0;
  const pending = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
    else entry.resolve(message.result);
  });

  const ready = new Promise((done, fail) => {
    socket.addEventListener('open', done, { once: true });
    socket.addEventListener('error', fail, { once: true });
  });

  const send = (method, params = {}) => new Promise((done, fail) => {
    const id = ++sequence;
    pending.set(id, { resolve: done, reject: fail });
    socket.send(JSON.stringify({ id, method, params }));
  });

  return { ready, send, close: () => socket.close() };
}

async function main() {
  const profile = await mkdtemp(join(tmpdir(), 'nebula-preview-'));
  const child = spawn(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--disable-crash-reporter',
    '--hide-scrollbars',
    '--no-first-run',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    '--window-size=1440,900',
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    const portFile = join(profile, 'DevToolsActivePort');
    const [port] = (await waitForFile(portFile, 15000)).trim().split('\n');

    for (const shot of SHOTS) {
      const url = `${pathToFileURL(join(root, 'demo/index.html')).href}${shot.query}`;
      const target = await openTarget(port, url);
      const page = connect(target.webSocketDebuggerUrl);
      await page.ready;
      await page.send('Page.enable');
      await page.send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await sleep(shot.wait);
      const { data } = await page.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });
      await writeFile(join(root, 'preview', shot.file), Buffer.from(data, 'base64'));
      console.log(`wrote preview/${shot.file}`);
      page.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`);
    }
  } finally {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
      await new Promise((done) => child.once('exit', done));
    }
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
