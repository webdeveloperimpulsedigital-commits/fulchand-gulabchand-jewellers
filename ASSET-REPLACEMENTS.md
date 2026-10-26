# Asset replacement list

No photography or AI imagery exists yet; the site shows the approved concept placeholders (gold line motif + slot label).

**Temporary AI images:** prompts and exact file names are in `AI-IMAGE-PROMPTS.md`. Drop files into `public/images/ai-jewellery/source/` and run `npm run images`; `src/content/image-manifest.json` records which slots are filled. Every AI image is temporary and is replaced by client photography before launch.

| Slot | Section | Ratio (desktop / mobile) | Source | File name / where |
| --- | --- | --- | --- | --- |
| HERO-01 / HERO-01M | 1 Opening | 1440×760 band / 9:14 | AI concept → client campaign | `hero-jewellery-editorial` + `-mobile` |
| COLL-01 | 2 Featured collection | 4:5 | AI concept → client on-body | `collection-necklace-on-body` |
| COLL-02 | 2 Featured collection | 1:1 | AI concept → client cut-out | `collection-gold-earrings-cutout` |
| PROD-01 | 4 Featured product | 1:1, 3000 px | Client product photo (names a real piece) | `featured-gold-necklace` |
| PROD-02 | 4 Loupe | 1:1, 4000 px+ | Client macro | used by the loupe via PROD-01 src |
| FWD-01 | 5 Forward | circle crop | **Client archive only — never AI** | not yet wired (placeholder) |
| CRAFT-01 | 6 The craft | 4:5 (+ loop) | AI concept → client workshop | `craft-goldsmith-bench` |
| EDIT-01…06 | 7 Product edit | 1:1, 3000 px | Client product photos | `edit-gold-necklace` … `edit-gold-chain` |
| BESP-01 | 8 Bespoke | 4:3 | AI concept → client | `bespoke-sketch-to-ring` |
| TRUST | 9 Trust | — | **Client stories and press logos only** | `stories` in `site.js` |
| VISIT-01 | 10 Plan your visit | 4:5 | **Client store photo only** | `assets.store.src` |
| IG-01…06 | Footer | 1:1 | Instagram feed integration (needs Meta access) | `Footer.js` |
| Logo | Header, footer | — | Extracted from FGJ.pdf; monogram is low-res — **request vector files** | `public/images/brand/` |

Web delivery: supply sRGB masters; `next/image` serves AVIF/WebP at responsive sizes. The hero is loaded with priority; everything else lazy-loads.
