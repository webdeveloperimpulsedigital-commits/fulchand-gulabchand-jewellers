/**
 * Image pipeline for the homepage's temporary AI concept images.
 *
 * 1. Put generated originals (png / jpg / jpeg / webp / avif) in
 *    public/images/ai-jewellery/source/ using the slot filenames below
 *    (extension free), e.g. source/hero-jewellery-editorial.png
 * 2. Run `npm run images` (also runs automatically before dev and build).
 *
 * Each found original is resized and saved as optimised WebP in
 * public/images/ai-jewellery/, and src/content/image-manifest.json is
 * rewritten so the matching ImageSlot shows the photo instead of the
 * placeholder. Missing files are listed; nothing is invented.
 */
import { readdirSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, 'public/images/ai-jewellery/source');
const OUT_DIR = join(ROOT, 'public/images/ai-jewellery');
const MANIFEST = join(ROOT, 'src/content/image-manifest.json');

// slot key (used in src/content/assets.js) → file base name, max long edge
export const SLOTS = {
  hero: { file: 'hero-jewellery-editorial', max: 2880 },
  heroMobile: { file: 'hero-jewellery-editorial-mobile', max: 1800 },
  collectionOnBody: { file: 'collection-necklace-on-body', max: 2000 },
  collectionCutout: { file: 'collection-gold-earrings-cutout', max: 1600 },
  featuredProduct: { file: 'featured-gold-necklace', max: 2400 },
  craft: { file: 'craft-goldsmith-bench', max: 2000 },
  bespoke: { file: 'bespoke-sketch-to-ring', max: 2000 },
  'EDIT-01': { file: 'edit-gold-necklace', max: 1200 },
  'EDIT-02': { file: 'edit-jhumka-earrings', max: 1200 },
  'EDIT-03': { file: 'edit-gold-bangle', max: 1200 },
  'EDIT-04': { file: 'edit-gold-ring', max: 1200 },
  'EDIT-05': { file: 'edit-gold-pendant', max: 1200 },
  'EDIT-06': { file: 'edit-gold-chain', max: 1200 },
  store: { file: 'store-boutique-interior', max: 2000 },
  archive: { file: 'archive-vintage-goldsmith', max: 1800 },
};

const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

mkdirSync(SRC_DIR, { recursive: true });
const originals = readdirSync(SRC_DIR).filter((f) => EXT.has(parse(f).ext.toLowerCase()));
const byBase = Object.fromEntries(originals.map((f) => [parse(f).name, join(SRC_DIR, f)]));

const manifest = {};
const missing = [];

for (const [key, { file, max }] of Object.entries(SLOTS)) {
  const src = byBase[file];
  if (!src) {
    missing.push(`${file}  (slot ${key})`);
    continue;
  }
  const out = join(OUT_DIR, `${file}.webp`);
  const stale = !existsSync(out) || statSync(out).mtimeMs < statSync(src).mtimeMs;
  if (stale) {
    await sharp(src)
      .rotate()
      .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);
  }
  const meta = await sharp(out).metadata();
  manifest[key] = { src: `/images/ai-jewellery/${file}.webp`, width: meta.width, height: meta.height };
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

const found = Object.keys(manifest).length;
console.log(`images: ${found}/${Object.keys(SLOTS).length} slots filled from public/images/ai-jewellery/source`);
if (missing.length) console.log('images: still placeholder →\n  ' + missing.join('\n  '));
