import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const srcDir = 'c:/shaheen/images';
const outDir = 'c:/shaheen/yes/public/images';
const publicDir = 'c:/shaheen/yes/public';

await fs.mkdir(outDir, { recursive: true });

const filesToProcess = [
  { file: 'bus1.webp', thumb: true },
  { file: 'bus2.webp', thumb: true },
  { file: 'bus3.webp', thumb: true },
  { file: 'bus4.webp', thumb: true },
  { file: 'founder.webp', thumb: true },
  { file: 'founder2.webp', thumb: true },
  { file: 'interior1.webp', thumb: true },
  { file: 'interior3.webp', thumb: true },
  { file: 'interior4.webp', thumb: true },
  { file: 'interior5.webp', thumb: true },
  { file: 'intero6.webp', thumb: true },
];

console.log('Processing images with Sharp...');

for (const item of filesToProcess) {
  const inputPath = path.join(srcDir, item.file);
  const baseName = path.parse(item.file).name;
  const mainOut = path.join(outDir, `${baseName}.webp`);
  const thumbOut = path.join(outDir, `${baseName}-thumb.webp`);

  const metadata = await sharp(inputPath).metadata();
  console.log(`Processing ${item.file} (original ${metadata.width}x${metadata.height})...`);

  // Max 1600px wide, quality 80
  let mainPipeline = sharp(inputPath);
  if (metadata.width && metadata.width > 1600) {
    mainPipeline = mainPipeline.resize({ width: 1600, withoutEnlargement: true });
  }
  await mainPipeline.webp({ quality: 80 }).toFile(mainOut);

  // 600px thumbnail
  if (item.thumb) {
    await sharp(inputPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(thumbOut);
  }
}

// Logo: never modify the logo; export it as-is plus favicon sizes
const logoSrc = path.join(srcDir, 'logo.webp');
await fs.copyFile(logoSrc, path.join(outDir, 'logo.webp'));
console.log('Copied logo.webp as-is.');

// Favicons from logo:
await sharp(logoSrc).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
await sharp(logoSrc).resize(192, 192).png().toFile(path.join(publicDir, 'favicon-192x192.png'));
await sharp(logoSrc).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
console.log('Favicons generated successfully.');

console.log('All image processing complete!');
