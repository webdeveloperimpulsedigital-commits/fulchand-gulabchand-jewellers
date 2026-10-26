import sharp from 'sharp';
import fs from 'fs';
import { FG_MONOGRAM_PATH, FG_CIRCLES } from '../src/content/fgBrandPaths.js';

async function generateOption1() {
  // Option 1: The Goldsmith's Hallmark Stamp on Images
  // Resize actual jewellery image to 480x600
  const photoBuffer = await sharp('public/images/ai-jewellery/featured-gold-necklace.webp')
    .resize(440, 550, { fit: 'cover' })
    .toBuffer();

  const W = 1280;
  const H = 720;

  // Create Hallmark Stamp SVG (70x70)
  const hallmarkSvg = `
  <svg width="74" height="74" viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
    <!-- Dark glass circular backdrop with subtle gold border -->
    <circle cx="37" cy="37" r="35" fill="#180909" fill-opacity="0.88" stroke="#CCAC78" stroke-width="1.2" />
    <circle cx="37" cy="37" r="31" fill="none" stroke="#CCAC78" stroke-width="0.8" stroke-dasharray="2,2" />
    <!-- Miniature FG Monogram in center -->
    <g transform="translate(19, 19) scale(0.12)">
      <g transform="translate(-140, -170)">
        <path d="${FG_MONOGRAM_PATH}" fill="#CCAC78" stroke="#FFFFFF" stroke-width="0.5" />
      </g>
    </g>
    <!-- Circular text arc or hallmark label -->
    <text x="37" y="60" font-size="6" fill="#CCAC78" font-family="sans-serif" text-anchor="middle" letter-spacing="1.5" font-weight="600">EST. 1948</text>
  </svg>
  `;

  const photoWithHallmark = await sharp(photoBuffer)
    .composite([
      {
        input: Buffer.from(hallmarkSvg),
        top: 20,
        left: 20,
      },
    ])
    .png()
    .toBuffer();

  const photoBase64 = `data:image/png;base64,${photoWithHallmark.toString('base64')}`;

  const svg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <!-- Presentation Header -->
    <rect x="0" y="0" width="${W}" height="54" fill="#180909" />
    <text x="30" y="34" font-size="14" fill="#CCAC78" font-family="sans-serif" letter-spacing="2.5" font-weight="700">OPTION 1: THE GOLDSMITH'S HALLMARK (AUTHENTICATED IMAGE SEALS)</text>
    <text x="${W - 30}" y="34" font-size="12" fill="#FFFFFF" opacity="0.6" font-family="sans-serif" text-anchor="end">SIGNATURE BRAND TECHNIQUE</text>

    <!-- Main Section Presentation Area -->
    <rect x="50" y="80" width="${W - 100}" height="600" fill="#FFFFFF" stroke="#EFE6DA" stroke-width="1" rx="4" />

    <!-- Left: Photo with Corner Hallmark Stamp -->
    <image href="${photoBase64}" x="100" y="105" width="440" height="550" />

    <!-- Right: Editorial narrative content -->
    <g transform="translate(600, 160)">
      <text x="0" y="0" font-size="12" fill="#B08D3F" font-family="sans-serif" letter-spacing="3" font-weight="600">HAUTE JOAILLERIE · CERTIFIED 22KT</text>
      
      <text x="0" y="44" font-size="32" fill="#180909" font-weight="600" letter-spacing="1">Imperial Emerald &amp; Diamond Collar</text>

      <text x="0" y="105" font-size="17" fill="#444444" font-family="sans-serif" line-height="1.6">
        <tspan x="0" dy="0">Sculpted in lustrous platinum and 22KT pure yellow gold, this</tspan>
        <tspan x="0" dy="28">one-of-a-kind statement unites vivid Colombian emeralds with</tspan>
        <tspan x="0" dy="28">cascades of pear-cut brilliant white solitaires.</tspan>
      </text>

      <!-- Hallmark Benefits Callout Box -->
      <g transform="translate(0, 220)">
        <rect x="0" y="0" width="540" height="150" fill="#FAF8F5" stroke="#CCAC78" stroke-width="1" rx="4" />
        <text x="24" y="32" font-size="13" fill="#B08D3F" font-family="sans-serif" font-weight="700" letter-spacing="1.5">WHY SENIOR LEADERSHIP WILL LOVE THIS:</text>
        <text x="24" y="65" font-size="14" fill="#333333" font-family="sans-serif">
          <tspan x="0" dy="0">✔ Authenticates every image as an exclusive Fulchand Gulabchand piece.</tspan>
          <tspan x="0" dy="24">✔ Like a royal goldsmith's seal or hallmark certificate of 22KT purity.</tspan>
          <tspan x="0" dy="24">✔ Leaves all body paragraphs 100% clean, legible, and uncluttered.</tspan>
        </text>
      </g>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile('public/images/options/option-1-hallmark-seal.png');
  console.log('Saved Option 1');
}

async function generateOption2() {
  // Option 2: Editorial Chapter Crests (Between Sections)
  const W = 1280;
  const H = 720;

  const svg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <!-- Presentation Header -->
    <rect x="0" y="0" width="${W}" height="54" fill="#180909" />
    <text x="30" y="34" font-size="14" fill="#CCAC78" font-family="sans-serif" letter-spacing="2.5" font-weight="700">OPTION 2: EDITORIAL CHAPTER CRESTS (BETWEEN-SECTION DIVIDERS)</text>
    <text x="${W - 30}" y="34" font-size="12" fill="#FFFFFF" opacity="0.6" font-family="sans-serif" text-anchor="end">SIGNATURE BRAND TECHNIQUE</text>

    <!-- Main Section Presentation Area -->
    <rect x="50" y="80" width="${W - 100}" height="600" fill="#FFFFFF" stroke="#EFE6DA" stroke-width="1" rx="4" />

    <!-- Simulated Section A (Above) -->
    <g transform="translate(100, 140)">
      <text x="540" y="0" font-size="11" fill="#888888" font-family="sans-serif" letter-spacing="3" text-anchor="middle">SECTION 01 · OUR HERITAGE</text>
      <text x="540" y="32" font-size="26" fill="#180909" font-weight="600" text-anchor="middle">Seven Decades of 22K Gold Goldsmithing</text>
    </g>

    <!-- THE CHAPTER CREST DIVIDER (Between Section A and Section B) -->
    <g transform="translate(100, 270)">
      <!-- Left hairline -->
      <line x1="120" y1="50" x2="440" y2="50" stroke="#CCAC78" stroke-width="1" />
      <circle cx="440" cy="50" r="2.5" fill="#CCAC78" />

      <!-- Center Crest: Double Gold Circle + FG Monogram -->
      <g transform="translate(540, 50)">
        <circle cx="0" cy="0" r="36" fill="#FAF8F5" stroke="#CCAC78" stroke-width="1.2" />
        <circle cx="0" cy="0" r="31" fill="none" stroke="#CCAC78" stroke-width="0.8" stroke-dasharray="2,2" />
        <g transform="translate(-16, -16) scale(0.1)">
          <g transform="translate(-140, -170)">
            <path d="${FG_MONOGRAM_PATH}" fill="#CCAC78" stroke="#180909" stroke-width="0.4" />
          </g>
        </g>
      </g>

      <!-- Right hairline -->
      <circle cx="640" cy="50" r="2.5" fill="#CCAC78" />
      <line x1="640" y1="50" x2="960" y2="50" stroke="#CCAC78" stroke-width="1" />

      <!-- Crest Subtitle -->
      <text x="540" y="105" font-size="10" fill="#B08D3F" font-family="sans-serif" letter-spacing="3" text-anchor="middle" font-weight="600">FULCHAND GULABCHAND · EST. 1948</text>
    </g>

    <!-- Simulated Section B (Below) -->
    <g transform="translate(100, 440)">
      <text x="540" y="0" font-size="11" fill="#888888" font-family="sans-serif" letter-spacing="3" text-anchor="middle">SECTION 02 · HIGH JEWELLERY</text>
      <text x="540" y="32" font-size="26" fill="#180909" font-weight="600" text-anchor="middle">Masterpiece Solitaires &amp; Heirlooms</text>
    </g>

    <!-- Benefits Callout Box -->
    <g transform="translate(120, 520)">
      <rect x="0" y="0" width="1040" height="120" fill="#FAF8F5" stroke="#CCAC78" stroke-width="1" rx="4" />
      <text x="24" y="28" font-size="13" fill="#B08D3F" font-family="sans-serif" font-weight="700" letter-spacing="1.5">WHY SENIOR LEADERSHIP WILL LOVE THIS:</text>
      <text x="24" y="58" font-size="14" fill="#333333" font-family="sans-serif">
        <tspan x="0" dy="0">✔ Rhythmic brand pacing: as the user scrolls, each section is introduced by the official house crest.</tspan>
        <tspan x="0" dy="24">✔ Completely distinct from generic jewellery websites; gives the site a royal, editorial chapter feel.</tspan>
        <tspan x="0" dy="24">✔ Zero clash with product photos or text readability.</tspan>
      </text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile('public/images/options/option-2-chapter-crest.png');
  console.log('Saved Option 2');
}

async function generateOption3() {
  // Option 3: Architectural Gold Framing & Margin Kissed Monogram
  const photoBuffer = await sharp('public/images/ai-jewellery/featured-gold-necklace.webp')
    .resize(440, 550, { fit: 'cover' })
    .png()
    .toBuffer();

  const W = 1280;
  const H = 720;

  // Render SVG background and overlays
  const svg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <!-- Presentation Header -->
    <rect x="0" y="0" width="${W}" height="54" fill="#180909" />
    <text x="30" y="34" font-size="14" fill="#CCAC78" font-family="sans-serif" letter-spacing="2.5" font-weight="700">OPTION 3: ARCHITECTURAL GOLD FRAMING &amp; MARGIN KISSED MONOGRAM</text>
    <text x="${W - 30}" y="34" font-size="12" fill="#FFFFFF" opacity="0.6" font-family="sans-serif" text-anchor="end">SIGNATURE BRAND TECHNIQUE</text>

    <!-- Main Section Presentation Area -->
    <rect x="50" y="80" width="${W - 100}" height="600" fill="#FFFFFF" stroke="#EFE6DA" stroke-width="1" rx="4" />

    <!-- Top-Left Gold Corner Bracket -->
    <path d="M 88 140 L 88 95 L 133 95" fill="none" stroke="#CCAC78" stroke-width="2.5" />
    <!-- Bottom-Right Gold Corner Bracket -->
    <path d="M 552 615 L 552 665 L 507 665" fill="none" stroke="#CCAC78" stroke-width="2.5" />
    
    <!-- Micro Brand Signature under photo -->
    <text x="100" y="680" font-size="10" fill="#B08D3F" font-family="sans-serif" letter-spacing="2" font-weight="600">FULCHAND GULABCHAND · CRAFT ARCHIVE</text>

    <!-- Far Right Edge: Subtle Architectural Monogram bleeding off edge (NO TEXT OVERLAP!) -->
    <g transform="translate(1080, 120) scale(1.6)">
      <g transform="translate(-140, -170)">
        <path d="${FG_MONOGRAM_PATH}" fill="#FAF5EB" stroke="#DECFA8" stroke-width="0.8" opacity="0.65" />
      </g>
    </g>

    <!-- Right: Editorial narrative content sitting in clear space -->
    <g transform="translate(600, 160)">
      <text x="0" y="0" font-size="12" fill="#B08D3F" font-family="sans-serif" letter-spacing="3" font-weight="600">ARCHITECTURAL BESPOKE DETAILS</text>
      
      <text x="0" y="44" font-size="32" fill="#180909" font-weight="600" letter-spacing="1">Framed in 22KT Heritage</text>

      <text x="0" y="105" font-size="17" fill="#444444" font-family="sans-serif" line-height="1.6">
        <tspan x="0" dy="0">Every image card is framed by artisanal gold corner brackets</tspan>
        <tspan x="0" dy="28">derived from the logo's geometry. In the far margin, the monogram</tspan>
        <tspan x="0" dy="28">bleeds subtly off-screen without ever touching or interfering with text.</tspan>
      </text>

      <!-- Benefits Callout Box -->
      <g transform="translate(0, 220)">
        <rect x="0" y="0" width="540" height="150" fill="#FAF8F5" stroke="#CCAC78" stroke-width="1" rx="4" />
        <text x="24" y="32" font-size="13" fill="#B08D3F" font-family="sans-serif" font-weight="700" letter-spacing="1.5">WHY SENIOR LEADERSHIP WILL LOVE THIS:</text>
        <text x="24" y="65" font-size="14" fill="#333333" font-family="sans-serif">
          <tspan x="0" dy="0">✔ Turns ordinary photos into curated gallery exhibits with gold frames.</tspan>
          <tspan x="0" dy="24">✔ Margin monogram gives the brand aura without colliding with words.</tspan>
          <tspan x="0" dy="24">✔ Gives every section an unmistakable, custom architectural identity.</tspan>
        </text>
      </g>
    </g>
  </svg>
  `;

  const bgBuffer = Buffer.from(svg);
  await sharp(bgBuffer)
    .composite([
      {
        input: photoBuffer,
        top: 105,
        left: 100,
      },
    ])
    .png()
    .toFile('public/images/options/option-3-gold-framing.png');
  console.log('Saved Option 3');
}

async function run() {
  await generateOption1();
  await generateOption2();
  await generateOption3();
  console.log('All 3 options generated!');
}

run();
