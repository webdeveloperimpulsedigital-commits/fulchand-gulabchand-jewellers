import manifest from './image-manifest.json';
import { getAssetUrl } from '@/utils/basePath';

/** Path of a processed image for a slot, or null (placeholder) — see scripts/sync-images.mjs. */
const img = (key) => (manifest[key]?.src ? getAssetUrl(manifest[key].src) : null);

/**
 * Image slots used on the homepage.
 *
 * `src` comes from image-manifest.json (written by `npm run images`).
 * `src: null` renders the approved concept placeholder (gold line motif +
 * slot label), exactly as in the design canvas. To fill a slot, drop the
 * original into public/images/ai-jewellery/source/ under the slot's file
 * name and run `npm run images` — the slot keeps its ratio, crop
 * (`position`) and alt text. Real client photography replaces these later.
 *
 * status: 'concept'  = temporary AI concept image planned (not yet generated)
 *         'client'   = must be real client material, never AI
 */
export const assets = {
  hero: {
    id: 'HERO-01', src: img('hero'), ratio: '21 / 9', mobileRatio: '9 / 14', status: 'concept',
    mobileSrc: img('heroMobile'), mobilePosition: '50% 40%',
    position: '70% 50%',
    video: '/videos/hero.mp4',
    alt: 'Gold necklace draped across a warm white plinth',
    tag: ['Concept image · HERO-01 · 21:9 / 9:16', 'Campaign still, negative space left'],
  },
  collectionOnBody: {
    id: 'COLL-01', src: img('collectionOnBody'), ratio: '4 / 5', status: 'concept', position: '50% 40%',
    alt: 'A necklace from the featured collection, worn at the collarbone',
    tag: ['Concept image · COLL-01 · 4:5', 'On-body, warm daylight'],
  },
  collectionCutout: {
    id: 'COLL-02', src: img('collectionCutout'), ratio: '1 / 1', status: 'concept', position: '50% 50%',
    alt: 'Earrings from the featured collection on white',
    tag: ['COLL-02 · 1:1', 'Cut-out'],
  },
  featuredProduct: {
    id: 'PROD-01', src: img('featuredProduct'), ratio: '3 / 4', status: 'concept', position: '50% 50%',
    alt: 'High Jewelry Diamond and Colombian Emerald statement necklace on luxury linen bust stand',
    tag: ['Concept image · PROD-01 · 3:4 · 2400px', 'Loupe macro: PROD-02'],
  },
  archive: {
    id: 'FWD-01', src: img('archive'), ratio: '1 / 1', status: 'concept', position: '50% 35%',
    alt: 'Archive photograph from the family',
  },
  craft: {
    id: 'CRAFT-01', src: img('craft'), ratio: '16 / 9', status: 'concept', position: '50% 50%',
    alt: 'Master Indian goldsmith detailing an intricate 22-karat gold paisley ornament with green enamel and fine tools',
    tag: ['Concept image · CRAFT-01 · 16:9', 'Macro craftsmanship'],
  },
  bespoke: {
    id: 'BESP-01', src: img('bespoke'), ratio: '4 / 3', status: 'concept', position: '60% 50%',
    alt: 'A pencil sketch of a ring beside the finished piece',
    tag: ['Concept image · BESP-01 · 4:3', 'Sketch to piece'],
  },
  store: {
    id: 'VISIT-01', src: img('store'), ratio: '4 / 5', status: 'concept', position: '50% 50%',
    alt: 'Inside the Fulchand Gulabchand store in Thane',
    tag: ['Concept image · VISIT-01 · 4:5', 'Store boutique'],
  },
};

/** Product edit tiles share one spec; src per tile when photography arrives. */
export const editSources = {
  'EDIT-01': img('EDIT-01'),
  'EDIT-02': img('EDIT-02'),
  'EDIT-03': img('EDIT-03'),
  'EDIT-04': img('EDIT-04'),
  'EDIT-05': img('EDIT-05'),
  'EDIT-06': img('EDIT-06'),
};
