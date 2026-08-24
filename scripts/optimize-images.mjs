// Generates optimized WebP copies of the original photography into src/assets/images.
// Originals in the project root are never modified.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");
const outDir = path.join(projectRoot, "src", "assets", "images");
const publicDir = path.join(projectRoot, "public");

await mkdir(outDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

async function writeResized(srcFile, outName, widths, { withoutEnlargement = true } = {}) {
  const srcPath = path.join(projectRoot, srcFile);
  for (const width of widths) {
    const outPath = path.join(outDir, `${outName}-${width}.webp`);
    await sharp(srcPath).rotate().resize({ width, withoutEnlargement }).webp({ quality: 82 }).toFile(outPath);
    console.log("wrote", outPath);
  }
}

async function writeCropped(srcFile, outName, widths, ratio, position) {
  const srcPath = path.join(projectRoot, srcFile);
  // Crop once at the largest requested width so every responsive variant shares the
  // exact same framing — cropping independently per width lets sharp's "attention"
  // strategy pick a slightly different region at each size, causing the subject to
  // visibly shift between srcset candidates.
  const maxWidth = Math.max(...widths);
  const maxHeight = Math.round(maxWidth / ratio);
  const base = await sharp(srcPath).rotate().resize(maxWidth, maxHeight, { fit: "cover", position }).toBuffer();

  for (const width of widths) {
    const height = Math.round(width / ratio);
    const outPath = path.join(outDir, `${outName}-${width}.webp`);
    await sharp(base).resize(width, height).webp({ quality: 82 }).toFile(outPath);
    console.log("wrote", outPath);
  }
}

// Hero: native 1536x1024 landscape, shown full-bleed via CSS object-cover — ship proportional, uncropped.
await writeResized("hero.png", "hero-raphael-cutting", [640, 1024, 1536]);

// About: native 1254x1254 square, cropped server-side to a 4:5 portrait.
await writeCropped("cute hair.png", "about-raphael-working", [640, 900, 1200], 4 / 5, "attention");

// Contact workstation: native 1254x1254 square, cropped server-side to a 4:3 landscape.
await writeCropped("place.png", "workstation-tools", [640, 900, 1200], 4 / 3, "attention");

// Before/after: native 853x1844 tall portraits from the same fixed camera setup.
// Both files must use the exact same extract rectangle (not independent "attention"
// crops) — otherwise the two auto-detected crops land a few percent apart and the
// subject visibly jumps up/down when the comparison slider moves between them.
async function writeFixedCropPair(files, outNames, widths, rect) {
  for (let i = 0; i < files.length; i++) {
    const srcPath = path.join(projectRoot, files[i]);
    const base = await sharp(srcPath).rotate().extract(rect).toBuffer();
    for (const width of widths) {
      const height = Math.round((width * rect.height) / rect.width);
      const outPath = path.join(outDir, `${outNames[i]}-${width}.webp`);
      await sharp(base).resize(width, height).webp({ quality: 82 }).toFile(outPath);
      console.log("wrote", outPath);
    }
  }
}

await writeFixedCropPair(
  ["befor.png", "after.png"],
  ["before-fade-portrait", "after-fade-portrait"],
  [420, 640, 800],
  { left: 0, top: 350, width: 853, height: 1066 },
);

// Gallery: native 1254x1254 squares (already square, minimal/no cropping needed).
await writeCropped("peprr.png", "gallery-taper-fade", [500, 800], 1, "attention");
await writeCropped("peprr2.png", "gallery-wavy-fringe", [500, 800], 1, "attention");
await writeCropped("peprr3.png", "gallery-textured-crop", [500, 800], 1, "attention");
await writeCropped("pper4.png", "gallery-classic-fade", [500, 800], 1, "attention");
await writeCropped("after.png", "gallery-clean-fade", [500, 800], 1, "attention");

// Logo mark: crop the RB monogram out of the full lockup (drops the "RAPHAEL BARBER" wordmark row)
// so it reads cleanly as a small square icon next to a live text wordmark in the header/footer.
const logoPath = path.join(projectRoot, "logo.png");
const monogramSide = 930;
const monogramLeft = Math.round((1402 - monogramSide) / 2);
const monogramCrop = sharp(logoPath).extract({ left: monogramLeft, top: 0, width: monogramSide, height: monogramSide });

for (const size of [96, 160, 320]) {
  const outPath = path.join(outDir, `logo-mark-${size}.webp`);
  await monogramCrop.clone().resize(size, size).webp({ quality: 90 }).toFile(outPath);
  console.log("wrote", outPath);
}

// Favicon / touch-icon set (PNG, same monogram crop).
for (const size of [32, 180, 192, 512]) {
  const outPath = path.join(outDir, `favicon-${size}.png`);
  await monogramCrop.clone().resize(size, size).png().toFile(outPath);
  console.log("wrote", outPath);
}
for (const size of [32, 180, 192, 512]) {
  const from = path.join(outDir, `favicon-${size}.png`);
  const to = path.join(publicDir, size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`);
  await sharp(from).toFile(to);
  console.log("wrote", to);
}

// Open Graph share image (1200x630) from the hero photograph.
const ogOutPath = path.join(publicDir, "og-image.jpg");
await sharp(path.join(projectRoot, "hero.png"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 85 })
  .toFile(ogOutPath);
console.log("wrote", ogOutPath);

console.log("Image optimization complete.");
