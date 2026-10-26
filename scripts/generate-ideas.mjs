import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { FG_MONOGRAM_PATH, FG_LETTER_F_PATH } from '../src/content/fgBrandPaths.js';

const OUT_DIR = './public/images/ideas';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function generateMockups() {
  // -------------------------------------------------------------
  // Concept 1: Boutique / Store Visit Section (Plan Visit)
  // -------------------------------------------------------------
  const svgConcept1 = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <defs>
      <clipPath id="c1"><rect x="0" y="0" width="1280" height="720" rx="8" /></clipPath>
    </defs>
    <g clip-path="url(#c1)">
      <!-- Label Header -->
      <rect x="0" y="0" width="1280" height="50" fill="#111111" />
      <text x="30" y="32" font-size="14" fill="#EAE4D8" font-family="sans-serif" letter-spacing="2" font-weight="bold">IDEA 1: BOUTIQUE VISIT &amp; ATELIER APPOINTMENT SECTION</text>

      <!-- Left Media Box: Flagship Store Image -->
      <rect x="60" y="90" width="540" height="570" fill="#E8E4DC" rx="4" />
      <text x="330" y="380" font-size="20" fill="#777" font-family="sans-serif" text-anchor="middle">[ Flagship Store Interior · Naupada, Thane ]</text>

      <!-- Right Column: Card with Half-Cropped Monogram Watermark -->
      <rect x="650" y="90" width="570" height="570" fill="#FFFFFF" rx="4" stroke="#EFEBE4" stroke-width="1" />
      
      <!-- Watermark anchored to right side of card, bleeding half off -->
      <g transform="translate(980, 240) scale(1.75)">
        <g transform="translate(-140, -170)">
          <path d="${FG_MONOGRAM_PATH}" fill="#F4EFE6" stroke="#DFD4BE" stroke-width="0.8" />
        </g>
      </g>

      <!-- Card Content -->
      <g transform="translate(710, 160)">
        <text x="0" y="0" font-size="13" fill="#A70000" font-family="sans-serif" letter-spacing="3" font-weight="600">FLAGSHIP ATELIER</text>
        <text x="0" y="44" font-size="36" fill="#111111" font-weight="400">Come and hold it.</text>
        <text x="0" y="90" font-size="17" fill="#666666" font-family="sans-serif" width="460">
          <tspan x="0" dy="0">Experience the weight of pure 22K gold, certified solitaires,</tspan>
          <tspan x="0" dy="26">and handcrafted Kundan Jadau heirlooms in person.</tspan>
        </text>

        <!-- Location details -->
        <g transform="translate(0, 160)">
          <text x="0" y="0" font-size="12" fill="#999" font-family="sans-serif" letter-spacing="2">ADDRESS</text>
          <text x="0" y="24" font-size="16" fill="#111" font-family="sans-serif">Ram Maruti Road, Naupada, Thane (W)</text>
          <text x="0" y="48" font-size="15" fill="#666" font-family="sans-serif">Maharashtra 400602 · Mumbai MMR</text>

          <text x="0" y="100" font-size="12" fill="#999" font-family="sans-serif" letter-spacing="2">VISITING HOURS</text>
          <text x="0" y="124" font-size="16" fill="#111" font-family="sans-serif">Tuesday – Sunday: 10:30 AM – 8:30 PM</text>
          <text x="0" y="148" font-size="15" fill="#A70000" font-family="sans-serif">Monday: By Private Appointment</text>
        </g>

        <!-- Button -->
        <rect x="0" y="380" width="220" height="52" fill="#111111" rx="2" />
        <text x="110" y="412" font-size="13" fill="#FFFFFF" font-family="sans-serif" letter-spacing="2" text-anchor="middle" font-weight="600">PLAN YOUR VISIT →</text>
      </g>
    </g>
  </svg>
  `;

  // -------------------------------------------------------------
  // Concept 2: Grand Footer House Foundation Watermark
  // -------------------------------------------------------------
  const svgConcept2 = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <defs>
      <clipPath id="c2"><rect x="0" y="0" width="1280" height="720" rx="8" /></clipPath>
    </defs>
    <g clip-path="url(#c2)">
      <!-- Label Header -->
      <rect x="0" y="0" width="1280" height="50" fill="#111111" />
      <text x="30" y="32" font-size="14" fill="#EAE4D8" font-family="sans-serif" letter-spacing="2" font-weight="bold">IDEA 2: FOOTER HOUSE FOUNDATION WATERMARK (PAGE ANCHOR)</text>

      <!-- Simulated Footer Background Container -->
      <rect x="60" y="90" width="1160" height="570" fill="#F4EFE6" rx="4" />

      <!-- Massive Central Monogram Watermark behind Footer columns -->
      <g transform="translate(640, 360) scale(3.4)">
        <g transform="translate(-160, -200)">
          <path d="${FG_MONOGRAM_PATH}" fill="#ECE5D8" stroke="#DECFA8" stroke-width="0.6" opacity="0.8" />
        </g>
      </g>

      <!-- Stacked Logo in Left Col -->
      <g transform="translate(120, 170)">
        <text x="0" y="0" font-size="28" fill="#111111" font-weight="700" letter-spacing="3">FULCHAND</text>
        <text x="0" y="30" font-size="28" fill="#111111" font-weight="700" letter-spacing="3">GULABCHAND</text>
        <text x="0" y="55" font-size="12" fill="#A70000" font-family="sans-serif" letter-spacing="4">JEWELLERS · EST. 1947</text>
        <text x="0" y="95" font-size="15" fill="#555555" font-family="sans-serif">
          <tspan x="0" dy="0">Seven decades of trust and</tspan>
          <tspan x="0" dy="24">uncompromising 22K gold artistry.</tspan>
        </text>
      </g>

      <!-- Col 1: High Jewellery -->
      <g transform="translate(480, 170)" font-family="sans-serif">
        <text x="0" y="0" font-size="13" fill="#111" letter-spacing="3" font-weight="bold">JEWELLERY</text>
        <text x="0" y="36" font-size="15" fill="#444">Bridal Heirlooms</text>
        <text x="0" y="68" font-size="15" fill="#444">Kundan Polki Sets</text>
        <text x="0" y="100" font-size="15" fill="#444">Certified Solitaires</text>
        <text x="0" y="132" font-size="15" fill="#444">Temple Nakshi Kadas</text>
        <text x="0" y="164" font-size="15" fill="#444">Everyday 22K Gold</text>
      </g>

      <!-- Col 2: The House -->
      <g transform="translate(740, 170)" font-family="sans-serif">
        <text x="0" y="0" font-size="13" fill="#111" letter-spacing="3" font-weight="bold">THE HOUSE</text>
        <text x="0" y="36" font-size="15" fill="#444">Our 1947 Heritage</text>
        <text x="0" y="68" font-size="15" fill="#444">Goldsmithing Ateliers</text>
        <text x="0" y="100" font-size="15" fill="#444">Purity &amp; Certification</text>
        <text x="0" y="132" font-size="15" fill="#444">Bespoke Commissions</text>
      </g>

      <!-- Col 3: Visit -->
      <g transform="translate(980, 170)" font-family="sans-serif">
        <text x="0" y="0" font-size="13" fill="#111" letter-spacing="3" font-weight="bold">VISIT</text>
        <text x="0" y="36" font-size="15" fill="#444">Naupada, Thane (W)</text>
        <text x="0" y="68" font-size="15" fill="#444">Plan Private Viewing</text>
        <text x="0" y="100" font-size="15" fill="#444">WhatsApp Concierge</text>
        <text x="0" y="132" font-size="15" fill="#444">Store Directions</text>
      </g>

      <!-- Copyright bar -->
      <line x1="120" y1="560" x2="1160" y2="560" stroke="#DFD5C2" stroke-width="1" />
      <text x="120" y="600" font-size="13" fill="#888" font-family="sans-serif">© 2026 Fulchand Gulabchand Jewellers. Certified Hallmarked Pure Gold.</text>
      <text x="1160" y="600" font-size="13" fill="#888" font-family="sans-serif" text-anchor="end">Privacy · Terms · Certification</text>
    </g>
  </svg>
  `;

  // -------------------------------------------------------------
  // Concept 3: Bespoke Atelier / Made-To-Order Section
  // -------------------------------------------------------------
  const svgConcept3 = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <defs>
      <clipPath id="c3"><rect x="0" y="0" width="1280" height="720" rx="8" /></clipPath>
    </defs>
    <g clip-path="url(#c3)">
      <!-- Label Header -->
      <rect x="0" y="0" width="1280" height="50" fill="#111111" />
      <text x="30" y="32" font-size="14" fill="#EAE4D8" font-family="sans-serif" letter-spacing="2" font-weight="bold">IDEA 3: BESPOKE ATELIER / COMMISSIONS SHOWCASE</text>

      <!-- Left Column: Copy with Half-Cropped Monogram Bleeding off Left -->
      <rect x="60" y="90" width="560" height="570" fill="#FFFFFF" rx="4" stroke="#EFEBE4" stroke-width="1" />

      <!-- Left Bleeding Watermark: cropped on left side -->
      <g transform="translate(20, 200) scale(1.8)">
        <g transform="translate(-140, -170)">
          <path d="${FG_MONOGRAM_PATH}" fill="#F4EFE6" stroke="#DFD4BE" stroke-width="0.8" />
        </g>
      </g>

      <g transform="translate(140, 190)">
        <text x="0" y="0" font-size="13" fill="#A70000" font-family="sans-serif" letter-spacing="3" font-weight="600">BESPOKE ATELIER</text>
        <text x="0" y="44" font-size="38" fill="#111111" font-weight="400">Made for one.</text>
        <text x="0" y="100" font-size="18" fill="#444444" font-family="sans-serif" width="420">
          <tspan x="0" dy="0">Every bespoke heirloom begins with an intimate</tspan>
          <tspan x="0" dy="28">dialogue — sketching your vision from raw imagination,</tspan>
          <tspan x="0" dy="28">selecting ethically certified rare gemstones, and hand-</tspan>
          <tspan x="0" dy="28">forging 22K gold into a family heirloom.</tspan>
        </text>

        <rect x="0" y="270" width="240" height="52" fill="#111111" rx="2" />
        <text x="120" y="302" font-size="13" fill="#FFFFFF" font-family="sans-serif" letter-spacing="2" text-anchor="middle" font-weight="600">COMMISSION A PIECE →</text>
      </g>

      <!-- Right Column: Sketch to Finished Piece Visual -->
      <rect x="660" y="90" width="560" height="570" fill="#EAE5DC" rx="4" />
      <text x="940" y="380" font-size="20" fill="#777" font-family="sans-serif" text-anchor="middle">[ Pencil Sketch to Finished Royal Kada ]</text>
    </g>
  </svg>
  `;

  // -------------------------------------------------------------
  // Concept 4: Editorial Chapter Break / Heritage Seal Interstitial
  // -------------------------------------------------------------
  const svgConcept4 = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5; font-family:'Playfair Display', Georgia, serif;">
    <defs>
      <clipPath id="c4"><rect x="0" y="0" width="1280" height="720" rx="8" /></clipPath>
    </defs>
    <g clip-path="url(#c4)">
      <!-- Label Header -->
      <rect x="0" y="0" width="1280" height="50" fill="#111111" />
      <text x="30" y="32" font-size="14" fill="#EAE4D8" font-family="sans-serif" letter-spacing="2" font-weight="bold">IDEA 4: EDITORIAL CHAPTER BREAK / HERITAGE MOTTO INTERSTITIAL</text>

      <!-- Center Card with Full Architectural Watermark -->
      <rect x="120" y="110" width="1040" height="530" fill="#FFFFFF" rx="4" stroke="#EFEBE4" stroke-width="1" />

      <!-- Center Watermark Monogram behind Text -->
      <g transform="translate(640, 375) scale(2.6)">
        <g transform="translate(-160, -200)">
          <path d="${FG_MONOGRAM_PATH}" fill="#F6F1E8" stroke="#E3D6BC" stroke-width="0.8" />
        </g>
      </g>

      <g transform="translate(640, 300)" text-anchor="middle">
        <text x="0" y="0" font-size="13" fill="#A70000" font-family="sans-serif" letter-spacing="4" font-weight="600">SINCE 1947 · NAUPADA, THANE</text>
        <text x="0" y="60" font-size="44" fill="#111111" font-weight="400" font-style="italic">“Every jewel is an intimate dialogue</text>
        <text x="0" y="115" font-size="44" fill="#111111" font-weight="400" font-style="italic">between time-honored heritage and living beauty.”</text>
        <line x1="-60" y1="170" x2="60" y2="170" stroke="#CCAC78" stroke-width="1.5" />
        <text x="0" y="210" font-size="15" fill="#777777" font-family="sans-serif" letter-spacing="2">THE HOUSE OF FULCHAND GULABCHAND</text>
      </g>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svgConcept1)).png().toFile(path.join(OUT_DIR, 'idea-1-boutique-visit.png'));
  await sharp(Buffer.from(svgConcept2)).png().toFile(path.join(OUT_DIR, 'idea-2-footer-foundation.png'));
  await sharp(Buffer.from(svgConcept3)).png().toFile(path.join(OUT_DIR, 'idea-3-bespoke-atelier.png'));
  await sharp(Buffer.from(svgConcept4)).png().toFile(path.join(OUT_DIR, 'idea-4-editorial-break.png'));

  console.log('Generated all 4 visual mockup images in public/images/ideas/');
}

generateMockups();
