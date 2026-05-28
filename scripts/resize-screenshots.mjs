import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

/** Base App Store — portrait screenshots 1284×2778, max 5 MB */
const WIDTH = 1284;
const HEIGHT = 2778;
const BG = "#0a0f08";

const sources = [
  {
    in: "/Users/kimba/.cursor/projects/Users-kimba-Desktop-EIGHT/assets/33-33930f99-5f31-4bdd-b0c9-6c814e29754e.png",
    out: "screenshot-1-home.png",
  },
  {
    in: "/Users/kimba/.cursor/projects/Users-kimba-Desktop-EIGHT/assets/22-df3fe213-548c-425a-b020-f18bbf031a7d.png",
    out: "screenshot-2-farm.png",
  },
  {
    in: "/Users/kimba/.cursor/projects/Users-kimba-Desktop-EIGHT/assets/11-09b856cd-8444-4621-a077-740ec674c8c5.png",
    out: "screenshot-3-badges.png",
  },
];

for (const { in: input, out } of sources) {
  const dest = path.join(publicDir, out);
  await sharp(input)
    .resize(WIDTH, HEIGHT, {
      fit: "contain",
      background: BG,
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  const meta = await sharp(dest).metadata();
  const { size } = await import("node:fs/promises").then((fs) =>
    fs.stat(dest),
  );
  console.log(`${out}: ${meta.width}×${meta.height}, ${(size / 1024).toFixed(0)} KB`);
}

console.log("\nWrote to public/");
