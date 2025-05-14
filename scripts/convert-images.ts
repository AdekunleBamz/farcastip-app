import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

async function convertSvgToPng(svgPath: string, pngPath: string) {
  try {
    await sharp(svgPath)
      .png()
      .toFile(pngPath);
    console.log(`Converted ${svgPath} to ${pngPath}`);
  } catch (error) {
    console.error(`Error converting ${svgPath}:`, error);
  }
}

async function convertAllImages() {
  const images = [
    { svg: 'icon.svg', png: 'icon.png', size: 512 },
    { svg: 'splash.svg', png: 'splash.png', size: 1200 },
    { svg: 'og-image.svg', png: 'og-image.png', size: 1200 }
  ];

  for (const image of images) {
    const svgPath = path.join(publicDir, image.svg);
    const pngPath = path.join(publicDir, image.png);
    await convertSvgToPng(svgPath, pngPath);
  }
}

convertAllImages().catch(console.error); 