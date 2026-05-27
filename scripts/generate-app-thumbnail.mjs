import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

/** Base App Thumbnail — must be 1.91:1 (e.g. 1910×1000), max 1 MB */
const WIDTH = 1910;
const HEIGHT = 1000;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f08"/>
      <stop offset="55%" stop-color="#111a0d"/>
      <stop offset="100%" stop-color="#1a2412"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#39ff14" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#ccff00" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ffe600" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="mark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#39ff14"/>
      <stop offset="52%" stop-color="#ccff00"/>
      <stop offset="100%" stop-color="#ffe600"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="48"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <ellipse cx="420" cy="500" rx="280" ry="280" fill="#39ff14" opacity="0.16" filter="url(#blur)"/>
  <ellipse cx="1500" cy="520" rx="320" ry="240" fill="#ccff00" opacity="0.14" filter="url(#blur)"/>
  <rect x="0" y="860" width="${WIDTH}" height="140" fill="url(#glow)"/>

  <g transform="translate(80, 120) scale(0.55)">
    <circle cx="256" cy="256" r="188" fill="#111a0d" stroke="url(#mark)" stroke-width="6"/>
    <path fill="url(#mark)" d="M 108 148 H 248 V 196 H 188 V 364 H 168 V 196 H 108 Z"/>
    <path fill="url(#mark)" fill-rule="evenodd" d="M 268 148 H 312 V 364 H 268 V 148 Z M 312 148 H 356 C 404 148 428 172 428 210 C 428 238 408 258 376 264 C 412 272 436 298 436 336 C 436 384 396 364 348 364 H 312 V 336 H 348 C 378 336 396 318 396 292 C 396 266 376 248 344 248 H 312 V 220 H 348 C 382 220 400 202 400 178 C 400 154 378 148 348 148 H 312 Z"/>
  </g>

  <text x="520" y="320" fill="#f4ffe8" font-family="Inter, Arial, sans-serif" font-size="120" font-weight="700" letter-spacing="-1">tinyBig</text>
  <text x="620" y="540" fill="#ccff00" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="500">GM · Deploy · Badges on Base</text>
  <text x="620" y="640" fill="rgba(244,255,232,0.75)" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="500">Acid green · yellow vibes</text>

  <rect x="620" y="720" width="420" height="72" rx="36" fill="url(#mark)" opacity="0.9"/>
  <text x="830" y="770" fill="#0a0f08" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700">Launch on Base</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(publicDir, "app-thumbnail.png"));

console.log("Wrote public/app-thumbnail.png");
