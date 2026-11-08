/**
 * Client half of the nebula-theme bundle.
 *
 * A distant wildfire behind a dark nebula: a static, filamented indigo-plum
 * sky, a soft ember glow, and a live flame field along the bottom edge. The
 * fire stays a low ember line while the harness is idle and rises into
 * separate flame fronts while any agent is thinking; the sky itself never
 * brightens.
 *
 * All presentation lives in CSS scoped to the `data-ds-nebula-theme` body
 * attribute; the React half is only a bridge that projects the live Session
 * status onto one more body attribute (`data-ds-nebula-think`).
 */
window.__ModuleLoader__.load({
  id: '@local/nebula-theme',
  factory(require) {
    const React = require('react');

    const PLUGIN_ID = '@local/nebula-theme';
    const STYLE_ID = '@local/nebula-theme/nebula-theme.css';
    const THEME_ATTRIBUTE = 'data-ds-nebula-theme';
    const THINK_ATTRIBUTE = 'data-ds-nebula-think';
    const TEXTURE_VARIABLE = '--ds-nebula-texture';

    /**
     * Alias-layer overrides for the active palette. Backgrounds carry some
     * alpha on purpose: they let the fire and nebula glow through the
     * application while leaving text legible. The layer applies to both
     * palette modes so the theme keeps its night-sky identity.
     */
    const TOKENS = Object.freeze({
      '--dsw-alias-bg-base': 'rgba(6, 5, 20, 0.46)',
      '--dsw-alias-bg-layer-1': 'rgba(19, 15, 44, 0.68)',
      '--dsw-alias-bg-layer-2': 'rgba(28, 22, 60, 0.72)',
      '--dsw-alias-bg-layer-3': 'rgba(38, 30, 78, 0.74)',
      '--dsw-alias-bg-overlay': 'rgba(20, 16, 46, 0.94)',
      '--dsw-alias-bg-document-preview': 'rgb(8, 6, 24)',
      '--dsw-alias-bg-module-platform': 'rgba(28, 22, 60, 0.70)',
      '--dsw-alias-bg-skeleton': 'rgba(142, 124, 255, 0.12)',
      '--dsw-alias-bg-mask-1': 'rgba(2, 1, 10, 0.55)',
      '--dsw-alias-bg-mask-2': 'rgba(2, 1, 10, 0.25)',
      '--dsw-alias-bg-mask-3': 'rgba(2, 1, 10, 0.6)',
      '--dsw-alias-border-l1': 'rgba(142, 124, 255, 0.12)',
      '--dsw-alias-border-l2': 'rgba(142, 124, 255, 0.20)',
      '--dsw-alias-border-l3': 'rgba(142, 124, 255, 0.26)',
      '--dsw-alias-border-l4': 'rgba(142, 124, 255, 0.32)',
      '--dsw-alias-brand-primary': 'rgb(228, 224, 255)',
      '--dsw-alias-brand-text': 'rgb(228, 224, 255)',
      '--dsw-alias-button-primary-fill': 'rgb(228, 224, 255)',
      '--dsw-alias-button-primary-hover': 'rgb(214, 208, 255)',
      '--dsw-alias-button-contrast-fill': 'rgb(228, 224, 255)',
      '--dsw-alias-label-primary': 'rgb(240, 238, 255)',
      '--dsw-alias-label-secondary': 'rgb(184, 176, 224)',
      '--dsw-alias-label-tertiary': 'rgb(160, 151, 204)',
      '--dsw-alias-label-caption': 'rgb(122, 113, 162)',
      '--dsw-alias-label-dimmed': 'rgb(96, 88, 132)',
      '--dsw-alias-link': 'rgb(255, 186, 120)',
      '--dsw-alias-state-error-primary': 'rgb(255, 105, 152)',
      '--dsw-alias-state-success-primary': 'rgb(112, 240, 190)',
      '--dsw-alias-state-warn-primary': 'rgb(255, 196, 108)',
      '--dsw-alias-state-warn-label': 'rgb(255, 200, 120)',
      '--dsw-alias-state-warn-tertiary': 'rgba(255, 196, 108, 0.14)',
      '--dsw-alias-state-success-tertiary': 'rgba(112, 240, 190, 0.14)',
      '--dsw-alias-state-idle-primary': 'rgb(126, 118, 168)',
      '--dsw-alias-state-business-primary': 'rgb(255, 170, 96)',
      '--dsw-alias-state-business-tertiary': 'rgba(255, 170, 96, 0.14)',
      '--dsw-alias-interactive-bg-hover': 'rgba(142, 124, 255, 0.14)',
      '--dsw-alias-interactive-bg-active': 'rgba(142, 124, 255, 0.20)',
      '--dsw-alias-interactive-bg-hover-accent': 'rgba(255, 160, 90, 0.16)',
      '--dsw-alias-interactive-bg-hover-solid': 'rgba(38, 30, 78, 0.9)',
      '--dsw-specific-sidebar-fill': 'rgba(11, 9, 30, 0.70)',
      '--dsw-specific-menu': 'rgba(20, 16, 46, 0.9)',
      '--dsw-alias-menu-group-header-fill': 'rgba(28, 23, 60, 0.94)',
      '--dsw-alias-markdown-code-block': 'rgba(18, 14, 42, 0.86)',
      '--dsw-alias-markdown-code-block-banner': 'rgba(28, 22, 60, 0.9)',
      '--dsw-alias-markdown-inline-code': 'rgba(142, 124, 255, 0.16)',
      '--dsw-alias-markdown-tag': 'rgba(142, 124, 255, 0.18)',
      '--dsw-alias-tooltip-bg': 'rgb(24, 20, 52)',
      '--dsw-alias-toast-bg': 'rgb(28, 23, 60)',
      '--dsw-alias-toast-label': 'rgb(240, 238, 255)',
      '--dsw-alias-turn-trigger-bg': 'rgba(28, 22, 60, 0.9)',
      '--dsw-alias-scrollbar-bg-l1': 'rgba(142, 124, 255, 0.24)',
      '--dsw-alias-scrollbar-bg-l2': 'rgba(142, 124, 255, 0.24)',
      '--dsw-alias-scrollbar-hover-l1': 'rgba(255, 178, 110, 0.5)',
      '--dsw-alias-scrollbar-hover-l2': 'rgba(255, 178, 110, 0.5)',
      '--dsw-specific-bubble': 'rgba(255, 170, 96, 0.09)',
      '--dsw-specific-bubble-highlight': 'rgba(255, 170, 96, 0.16)',
    });

    const CSS = `
html[data-ds-nebula-theme] {
  background-color: #05030c;
}

body[data-ds-nebula-theme] {
  background-color: transparent !important;
}

/* The Conversation column is the window onto the sky: drop its own base paint
   so the chat sits directly over the nebula and fire. The three phase values
   belong to the Conversation root; other data-phase users are untouched. */
body[data-ds-nebula-theme] [data-phase="hero"],
body[data-ds-nebula-theme] [data-phase="active"],
body[data-ds-nebula-theme] [data-phase="settling"] {
  background-color: transparent;
}

/* The nebula itself: fixed, filamented indigo-plum sky. It never brightens or
   changes speed when an agent starts thinking; only the fire reacts. */
body[data-ds-nebula-theme]::before {
  content: '';
  position: fixed;
  inset: -6%;
  z-index: -5;
  pointer-events: none;
  background: var(--ds-nebula-texture, none) 50% 50% / cover no-repeat;
  opacity: 1;
  transform: translate3d(-4%, -2%, 0) scale(1.04);
  animation: ds-nebula-drift 60s ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes ds-nebula-drift {
  0% { transform: translate3d(-4%, -2%, 0) scale(1.04); }
  50% { transform: translate3d(1.5%, 2.4%, 0) scale(1.09); }
  100% { transform: translate3d(4%, -1%, 0) scale(1.06); }
}

/* A second, slightly larger copy of the sky drifting the other way. It lies
   between the base nebula and the fire glow, so the cloud structure visibly
   shifts against itself without the sky getting brighter. */
body[data-ds-nebula-theme] .dsnb-nebula-parallax {
  position: fixed;
  inset: -10%;
  z-index: -4;
  pointer-events: none;
  background: var(--ds-nebula-texture, none) 50% 50% / cover no-repeat;
  mix-blend-mode: screen;
  filter: blur(2px) saturate(1.15);
  opacity: 0.4;
  transform: translate3d(3%, 1.5%, 0) scale(1.16);
  animation:
    ds-nebula-parallax 95s ease-in-out infinite alternate,
    ds-nebula-breathe 27s ease-in-out infinite;
  will-change: transform, opacity;
}

@keyframes ds-nebula-parallax {
  0% { transform: translate3d(3%, 1.5%, 0) scale(1.16); }
  50% { transform: translate3d(-1.5%, -1.5%, 0) scale(1.21); }
  100% { transform: translate3d(-3.5%, 2%, 0) scale(1.17); }
}

@keyframes ds-nebula-breathe {
  0%, 100% { opacity: 0.34; }
  50% { opacity: 0.46; }
}

/* Out-of-focus firelight spilling into the sky. Drawn from a downsampled copy
   of the flame field, so it follows the real flame shape. */
body[data-ds-nebula-theme] .dsnb-glow {
  position: fixed;
  left: -10%;
  width: 120%;
  bottom: -6%;
  height: 78vh;
  z-index: -3;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(22px) saturate(1.1);
  transform-origin: 50% 100%;
  opacity: 0.28;
  -webkit-mask-image: linear-gradient(to top, #000 0, #000 30%, transparent 100%);
          mask-image: linear-gradient(to top, #000 0, #000 30%, transparent 100%);
}

/* The flames: a mid-focus layer with only 5px of blur, height-masked so the
   upper part of the transcript never sits on bright orange. */
body[data-ds-nebula-theme] .dsnb-fire {
  position: fixed;
  left: -4%;
  width: 108%;
  bottom: -1%;
  height: 64vh;
  z-index: -2;
  pointer-events: none;
  filter: blur(5px) saturate(1.08);
  opacity: 0.56;
  -webkit-mask-image: linear-gradient(to top, #000 0, #000 30%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.2) 78%, transparent 100%);
          mask-image: linear-gradient(to top, #000 0, #000 30%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.2) 78%, transparent 100%);
}

/* Reading veil: dark through the middle of the viewport and clear in the
   bottom band where the fire lives. Sits above the fire, below the UI. */
body[data-ds-nebula-theme]::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(to top, rgba(5, 3, 14, 0.50) 0, rgba(5, 3, 14, 0.20) 5vh, rgba(5, 3, 14, 0) 10vh),
    linear-gradient(to bottom,
      rgba(5, 3, 14, 0.46) 0%,
      rgba(5, 3, 14, 0.14) 22%,
      rgba(5, 3, 14, 0.22) 52%,
      rgba(5, 3, 14, 0) 82%),
    radial-gradient(120% 90% at 50% 42%, rgba(5, 3, 14, 0) 55%, rgba(3, 2, 9, 0.55) 100%);
}

/* Make the composer a glass slab so the flame base glows through it instead
   of being hidden behind an opaque footer. */
body[data-ds-nebula-theme] [data-composer-card] {
  background-color: rgba(18, 14, 40, 0.42);
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
}

/* The floating chats pick up the same space glass, and their frame glows with
   the ember fire while an agent is thinking. These class names belong to the
   optional active-chats plugin; when it is absent the rules are inert. */
body[data-ds-nebula-theme] .dsac-window,
body[data-ds-nebula-theme] .dsac-pill {
  background-color: rgba(18, 14, 44, 0.72);
  border-color: rgba(142, 124, 255, 0.28);
  box-shadow:
    0 18px 48px rgba(2, 1, 10, 0.55),
    0 0 0 1px rgba(142, 124, 255, 0.06),
    0 0 36px rgba(120, 86, 255, 0.12);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  transition: box-shadow 0.8s ease, border-color 0.8s ease;
}

body[data-ds-nebula-theme][data-ds-nebula-think='on'] .dsac-window,
body[data-ds-nebula-theme][data-ds-nebula-think='on'] .dsac-pill {
  border-color: rgba(255, 178, 110, 0.48);
  box-shadow:
    0 18px 48px rgba(2, 1, 10, 0.6),
    0 0 0 1px rgba(255, 178, 110, 0.16),
    0 0 44px rgba(255, 150, 60, 0.22),
    0 0 90px rgba(180, 80, 255, 0.16);
}

body[data-ds-nebula-theme] .dsac-pin {
  color: rgb(255, 190, 120);
}

body[data-ds-nebula-theme][data-ds-nebula-think='on'] .dsac-title {
  color: rgb(255, 236, 218);
  text-shadow: 0 0 14px rgba(255, 160, 80, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  body[data-ds-nebula-theme]::before,
  body[data-ds-nebula-theme] .dsnb-nebula-parallax {
    animation: none;
  }
  body[data-ds-nebula-theme] .dsnb-fire,
  body[data-ds-nebula-theme] .dsnb-glow {
    transition: opacity 0.6s linear;
  }
}
`;

    /** Clamped smoothstep. */
    function smoothstep(edge0, edge1, value) {
      const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    /** Stable 2D hash in [0, 1]. */
    function hash2(x, y) {
      let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    }

    /** Periodic value noise; tiles seamlessly in x and y. */
    function periodicNoise(x, y, periodX, periodY) {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      const x0 = ((ix % periodX) + periodX) % periodX;
      const x1 = (x0 + 1) % periodX;
      const y0 = ((iy % periodY) + periodY) % periodY;
      const y1 = (y0 + 1) % periodY;
      const a = hash2(x0, y0);
      const b = hash2(x1, y0);
      const c = hash2(x0, y1);
      const d = hash2(x1, y1);
      const top = a + (b - a) * ux;
      const bottom = c + (d - c) * ux;
      return top + (bottom - top) * uy;
    }

    /**
     * Generate the nebula sky once: domain-warped fBm filaments, dark dust
     * lanes, and a crimson underglow on the lower cloud bottoms as if lit by
     * the fire below. Generated small and upscaled smooth, dithered against
     * banding, and returned as a JPEG blob.
     * @returns a Blob, or null when Canvas is unavailable.
     */
    function createNebulaTexture() {
      const width = 1600;
      const height = 900;
      const lowWidth = 640;
      const lowHeight = 360;
      const seed = 20261107 % 9973;
      const low = document.createElement('canvas');
      low.width = lowWidth;
      low.height = lowHeight;
      const lowContext = low.getContext('2d');
      if (lowContext === null) return Promise.resolve(null);
      const image = lowContext.createImageData(lowWidth, lowHeight);
      const data = image.data;

      const valueNoise = (x, y) => {
        const ix = Math.floor(x);
        const iy = Math.floor(y);
        const fx = x - ix;
        const fy = y - iy;
        const ux = fx * fx * (3 - 2 * fx);
        const uy = fy * fy * (3 - 2 * fy);
        const a = hash2(ix + seed, iy);
        const b = hash2(ix + 1 + seed, iy);
        const c = hash2(ix + seed, iy + 1);
        const d = hash2(ix + 1 + seed, iy + 1);
        const top = a + (b - a) * ux;
        const bottom = c + (d - c) * ux;
        return top + (bottom - top) * uy;
      };
      const fbm = (x, y, octaves) => {
        let amplitude = 0.5;
        let frequency = 1;
        let sum = 0;
        let norm = 0;
        for (let octave = 0; octave < octaves; octave++) {
          sum += amplitude * valueNoise(x * frequency, y * frequency);
          norm += amplitude;
          amplitude *= 0.5;
          frequency *= 2.02;
        }
        return sum / norm;
      };
      const mix = (a, b, k) => a + (b - a) * k;
      const ramp = [
        [0.00, 7, 5, 16],
        [0.35, 20, 14, 52],
        [0.65, 64, 34, 112],
        [1.00, 132, 52, 136],
      ];

      for (let y = 0; y < lowHeight; y++) {
        for (let x = 0; x < lowWidth; x++) {
          const u = (x / lowWidth) * 3.2;
          const v = (y / lowHeight) * 1.8;
          const gy = y / lowHeight;
          const qx = fbm(u + 1.7, v + 9.2, 4);
          const qy = fbm(u + 8.3, v + 2.8, 4);
          const density = fbm(u + 1.9 * qx, v + 1.9 * qy, 5);
          const dust = fbm(u * 0.8 + 5.1 + 2.4 * qy, v * 0.8 + 3.3 + 2.4 * qx, 4);
          const lane = 1 - 0.92 * smoothstep(0.55, 0.75, dust);
          const dens = smoothstep(0.38, 0.78, density) * lane;

          let stop = 0;
          while (stop < ramp.length - 2 && dens > ramp[stop + 1][0]) stop++;
          const a = ramp[stop];
          const b = ramp[stop + 1];
          const k = (dens - a[0]) / (b[0] - a[0]);
          let red = mix(a[1], b[1], k);
          let green = mix(a[2], b[2], k);
          let blue = mix(a[3], b[3], k);

          const under = Math.pow(Math.max(0, (gy - 0.30) / 0.70), 2);
          const warm = under * (0.25 + 0.75 * dens) * lane;
          red += 150 * warm;
          green += 34 * warm;
          blue += 46 * warm;

          const dim = 0.70 + 0.30 * smoothstep(0, 0.55, gy);
          const offset = (y * lowWidth + x) * 4;
          data[offset] = red * dim;
          data[offset + 1] = green * dim;
          data[offset + 2] = blue * dim;
          data[offset + 3] = 255;
        }
      }
      lowContext.putImageData(image, 0, 0);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (context === null) return Promise.resolve(null);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(low, 0, 0, width, height);

      const vignette = context.createRadialGradient(
        width / 2, height / 2, height * 0.30, width / 2, height / 2, height * 0.95,
      );
      vignette.addColorStop(0, 'rgba(3, 2, 9, 0)');
      vignette.addColorStop(1, 'rgba(3, 2, 9, 0.55)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      // Triangular dither to keep the smooth dark gradient from banding.
      const pixels = context.getImageData(0, 0, width, height);
      const channel = pixels.data;
      for (let index = 0; index < channel.length; index += 4) {
        const noise = (Math.random() + Math.random() - 1) * 1.5;
        channel[index] += noise;
        channel[index + 1] += noise;
        channel[index + 2] += noise;
      }
      context.putImageData(pixels, 0, 0);
      return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    }

    const FIRE_WIDTH = 256;
    const FIRE_HEIGHT = 112;
    const GLOW_WIDTH = 48;
    const GLOW_HEIGHT = 20;
    const IDLE_ENERGY = 0.20;
    const FPS_THINKING = 30;
    const FPS_IDLE = 12;
    const TAU_UP = 0.9;
    const TAU_DOWN = 2.6;

    /** Fire palette: plum, crimson, orange, cream; alpha rises with heat. */
    function buildFireLut() {
      const stops = [
        [0.00, 0, 0, 0],
        [0.08, 44, 8, 40],
        [0.20, 98, 16, 58],
        [0.34, 168, 32, 40],
        [0.50, 224, 70, 26],
        [0.68, 255, 128, 40],
        [0.84, 255, 176, 78],
        [1.00, 255, 214, 142],
      ];
      const lut = new Uint8ClampedArray(256 * 4);
      for (let index = 0; index < 256; index++) {
        const t = index / 255;
        let stop = 0;
        while (stop < stops.length - 2 && t > stops[stop + 1][0]) stop++;
        const a = stops[stop];
        const b = stops[stop + 1];
        const k = (t - a[0]) / (b[0] - a[0]);
        lut[index * 4] = a[1] + (b[1] - a[1]) * k;
        lut[index * 4 + 1] = a[2] + (b[2] - a[2]) * k;
        lut[index * 4 + 2] = a[3] + (b[3] - a[3]) * k;
        lut[index * 4 + 3] = 255 * smoothstep(0.03, 0.45, t);
      }
      return lut;
    }

    /** Cooling texture: tall noise cells create vertical tongues. */
    function buildCooling() {
      const cooling = new Float32Array(FIRE_WIDTH * FIRE_HEIGHT);
      for (let y = 0; y < FIRE_HEIGHT; y++) {
        for (let x = 0; x < FIRE_WIDTH; x++) {
          cooling[y * FIRE_WIDTH + x] =
            0.62 * periodicNoise((x / FIRE_WIDTH) * 40, (y / FIRE_HEIGHT) * 6, 40, 6)
            + 0.38 * periodicNoise((x / FIRE_WIDTH) * 96, (y / FIRE_HEIGHT) * 14, 96, 14);
        }
      }
      return cooling;
    }

    /**
     * Build the fire bed: a mid-focus flame canvas plus a heavily blurred
     * glow canvas drawn from a downsample of the same field. Idle keeps a
     * short ember line; thinking raises and brightens the flames. Opacity is
     * driven from JavaScript, never from CSS transitions or filters.
     * @returns both canvas elements plus teardown, or null without Canvas.
     */
    function createFireLayer() {
      const flames = document.createElement('canvas');
      flames.className = 'dsnb-fire';
      flames.setAttribute('aria-hidden', 'true');
      flames.width = FIRE_WIDTH;
      flames.height = FIRE_HEIGHT;
      const fireContext = flames.getContext('2d');
      if (fireContext === null) return null;

      const glow = document.createElement('canvas');
      glow.className = 'dsnb-glow';
      glow.setAttribute('aria-hidden', 'true');
      glow.width = GLOW_WIDTH;
      glow.height = GLOW_HEIGHT;
      const glowContext = glow.getContext('2d');
      if (glowContext === null) return null;

      const lut = buildFireLut();
      const cooling = buildCooling();
      const image = fireContext.createImageData(FIRE_WIDTH, FIRE_HEIGHT);
      let current = new Float32Array(FIRE_WIDTH * FIRE_HEIGHT);
      let next = new Float32Array(FIRE_WIDTH * FIRE_HEIGHT);
      const reduced = typeof matchMedia === 'function'
        ? matchMedia('(prefers-reduced-motion: reduce)')
        : undefined;

      let raf = 0;
      let energy = IDLE_ENERGY;
      let clock = 0;
      let accumulator = 0;
      let previous = performance.now();
      let lastThinking = null;

      function step(t, e) {
        const source = 0.50 + 0.50 * e;
        const coolingBase = 0.0262 - 0.0135 * e;
        const wind = 0.26 * Math.sin(t * 0.11) + 0.15 * Math.sin(t * 0.29 + 1.7);
        const scroll = Math.floor(t * 18);
        const lastRow = (FIRE_HEIGHT - 1) * FIRE_WIDTH;
        const sourceY = (t * 0.35) % 8;
        for (let x = 0; x < FIRE_WIDTH; x++) {
          const front = smoothstep(0.40, 0.80, periodicNoise((x / FIRE_WIDTH) * 9, sourceY, 9, 8));
          const u = x / FIRE_WIDTH;
          const bump = (center, width) => Math.exp(-(((u - center) / width) ** 2));
          const weight = 0.42 + 0.58 * Math.max(bump(0.52, 0.22), 0.7 * bump(0.80, 0.14));
          current[lastRow + x] = Math.min(1, source * weight * (0.30 + 0.70 * front)
            * (0.94 + 0.06 * Math.sin(t * 7 + x * 0.9))
            + 0.04 * Math.max(0, Math.sin(t * 3 + x * 0.21)));
        }
        for (let y = 0; y < FIRE_HEIGHT - 1; y++) {
          const lean = wind * (1 + 1.4 * (1 - y / FIRE_HEIGHT));
          const coolingRow = ((y + scroll) % FIRE_HEIGHT) * FIRE_WIDTH;
          const below = (y + 1) * FIRE_WIDTH;
          const out = y * FIRE_WIDTH;
          const wobble = y * 0.21 + t * 2.1;
          for (let x = 0; x < FIRE_WIDTH; x++) {
            const sourceX = x + lean + 0.35 * Math.sin(wobble + x * 0.045);
            const base = Math.floor(sourceX);
            const fraction = sourceX - base;
            let i0 = base % FIRE_WIDTH;
            if (i0 < 0) i0 += FIRE_WIDTH;
            const i1 = (i0 + 1) % FIRE_WIDTH;
            const iLeft = (i0 + FIRE_WIDTH - 1) % FIRE_WIDTH;
            const iRight = (i0 + 2) % FIRE_WIDTH;
            const value = 0.5 * (current[below + i0] * (1 - fraction) + current[below + i1] * fraction)
              + 0.25 * (current[below + iLeft] + current[below + iRight])
              - coolingBase * (0.45 + 1.1 * cooling[coolingRow + x]);
            next[out + x] = value > 0 ? value : 0;
          }
        }
        next.set(current.subarray(lastRow), lastRow);
        const swap = current;
        current = next;
        next = swap;
      }

      function render() {
        const data = image.data;
        for (let index = 0, offset = 0; index < current.length; index++, offset += 4) {
          const value = current[index];
          const key = (value >= 1 ? 255 : (value * 255) | 0) * 4;
          data[offset] = lut[key];
          data[offset + 1] = lut[key + 1];
          data[offset + 2] = lut[key + 2];
          data[offset + 3] = lut[key + 3];
        }
        fireContext.putImageData(image, 0, 0);
        glowContext.imageSmoothingQuality = 'high';
        glowContext.clearRect(0, 0, GLOW_WIDTH, GLOW_HEIGHT);
        glowContext.drawImage(flames, 0, 0, FIRE_WIDTH, FIRE_HEIGHT, 0, 0, GLOW_WIDTH, GLOW_HEIGHT);
      }

      function warm(e) {
        for (let index = 0; index < 90; index++) step(index / 30, e);
        render();
      }

      function applyOpacity(e, breath) {
        flames.style.opacity = (0.50 + 0.45 * e).toFixed(3);
        glow.style.opacity = ((0.34 + 0.51 * e) * (breath || 1)).toFixed(3);
      }

      function tick(now) {
        raf = requestAnimationFrame(tick);
        const dt = Math.min(0.1, (now - previous) / 1000);
        previous = now;
        if (document.hidden) return;
        const thinking = document.body.getAttribute(THINK_ATTRIBUTE) === 'on';

        if (reduced !== undefined && reduced.matches) {
          if (thinking !== lastThinking) {
            lastThinking = thinking;
            energy = thinking ? 0.7 : IDLE_ENERGY;
            warm(energy);
            applyOpacity(energy, 0);
          }
          return;
        }

        energy += ((thinking ? 1 : IDLE_ENERGY) - energy)
          * (1 - Math.exp(-dt / (thinking ? TAU_UP : TAU_DOWN)));
        const seconds = now / 1000;
        const breath = 1
          + 0.07 * Math.sin((seconds * 2 * Math.PI) / 9)
          + (thinking ? 0.05 * Math.sin(seconds * 2.3) + 0.03 * Math.sin(seconds * 5.1) : 0);
        applyOpacity(energy, breath);

        accumulator += dt;
        const frame = 1 / (thinking ? FPS_THINKING : FPS_IDLE);
        if (accumulator < frame) return;
        accumulator %= frame;
        clock += frame;
        step(clock, energy);
        render();
      }

      warm(IDLE_ENERGY);
      applyOpacity(IDLE_ENERGY, 1);
      raf = requestAnimationFrame(tick);
      return {
        elements: [glow, flames],
        dispose() {
          cancelAnimationFrame(raf);
        },
      };
    }

    /** Bridge that flips the thinking attribute whenever any Session runs. */
    function createNebulaBridge() {
      return function NebulaBridge(props) {
        const useSessionStatus = props.useSessionStatus;
        const thinking = useSessionStatus((snapshot) => {
          for (const status of snapshot.values()) {
            if (status.running === true) return true;
          }
          return false;
        });
        React.useEffect(() => {
          document.body.setAttribute(THINK_ATTRIBUTE, thinking ? 'on' : 'off');
          return () => { document.body.removeAttribute(THINK_ATTRIBUTE); };
        }, [thinking]);
        return null;
      };
    }

    /** Every token as a mode-pair; the night-sky layer applies to both palettes. */
    function modePairTokens(tokens) {
      const pairs = {};
      for (const [name, value] of Object.entries(tokens)) {
        pairs[name] = { light: value, dark: value };
      }
      return Object.freeze(pairs);
    }

    return {
      inject: ['theme', 'slots'],
      apply(ctx) {
        // A registered theme id cannot be persisted by the settings document
        // (only light/dark/system are), and settings adoption would revert it.
        // The supported route for a plugin-owned look is a token override
        // layer, which stacks over whatever palette the user picked and stays
        // put until this plugin is disabled.
        ctx.effect(() => ctx.theme.overrideTokens(PLUGIN_ID, modePairTokens(TOKENS)), 'nebula-theme: token layer');

        ctx.effect(() => {
          const tag = document.createElement('style');
          tag.dataset.plugin = PLUGIN_ID;
          tag.dataset.pluginCss = STYLE_ID;
          tag.textContent = CSS;
          document.head.appendChild(tag);
          return () => { tag.remove(); };
        }, 'nebula-theme: styles');

        ctx.effect(() => {
          let url = null;
          let cancelled = false;
          let cancelScheduled = () => {};
          const run = () => {
            createNebulaTexture().then((blob) => {
              if (cancelled || blob === null) return;
              url = URL.createObjectURL(blob);
              document.documentElement.style.setProperty(TEXTURE_VARIABLE, `url("${url}")`);
            }).catch((error) => {
              console.error('nebula-theme: nebula texture generation failed', error);
            });
          };
          if ('requestIdleCallback' in window) {
            const id = requestIdleCallback(run, { timeout: 1500 });
            cancelScheduled = () => cancelIdleCallback(id);
          } else {
            const id = setTimeout(run, 50);
            cancelScheduled = () => clearTimeout(id);
          }
          return () => {
            cancelled = true;
            cancelScheduled();
            if (url !== null) URL.revokeObjectURL(url);
            document.documentElement.style.removeProperty(TEXTURE_VARIABLE);
          };
        }, 'nebula-theme: texture');

        ctx.effect(() => {
          const layer = document.createElement('div');
          layer.className = 'dsnb-nebula-parallax';
          layer.setAttribute('aria-hidden', 'true');
          document.body.appendChild(layer);
          return () => { layer.remove(); };
        }, 'nebula-theme: nebula parallax');

        ctx.effect(() => {
          const fire = createFireLayer();
          if (fire === null) return undefined;
          for (const element of fire.elements) document.body.appendChild(element);
          return () => {
            fire.dispose();
            for (const element of fire.elements) element.remove();
          };
        }, 'nebula-theme: fire');

        ctx.effect(() => {
          const body = document.body;
          body.setAttribute(THEME_ATTRIBUTE, '');
          return () => { body.removeAttribute(THEME_ATTRIBUTE); };
        }, 'nebula-theme: projection');

        const NebulaBridge = createNebulaBridge();
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'nebula-theme.status',
          order: 5,
        }, NebulaBridge));
      },
    };
  },
});
