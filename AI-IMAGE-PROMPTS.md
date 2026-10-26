# AI image prompts — temporary concept imagery

**Status:** not generated. The connected generator (Gamma) is on the free plan with 0 credits, and no other tool in this environment can create images from text. These images are **temporary concept assets** and must be replaced by client photography before launch. They must never be presented as the client's actual products.

## How to use

1. Generate each image with any tool (Adobe Firefly, Midjourney, Gamma once credits are added, etc.).
2. Save it in `public/images/ai-jewellery/source/` with the **exact file name** below (any of .png / .jpg / .webp).
3. Run `npm run images` (it also runs automatically before `npm run dev` and `npm run build`). Each image is resized, converted to WebP and wired into its section; no code changes are needed.

Reject any result with distorted jewellery, malformed stones, odd hands, synthetic-looking skin, heavy sparkle effects, or any text or logo in the frame.

**Add this to every prompt:**
> Photorealistic high-end jewellery campaign photography, controlled soft studio light from upper left, natural reflections, true-to-life 22-karat yellow-gold colour, crisp metal texture, shallow but natural depth of field, no text, no logos, no watermark.

| File name | Section | Ratio | Prompt |
| --- | --- | --- | --- |
| `hero-jewellery-editorial` | 1 Opening (desktop) | 21:9, ≥ 2880 px wide | An ornate yellow-gold Indian necklace with fine filigree and small uncut diamond (polki) accents, draped diagonally over a warm white plaster plinth in the **right third** of the frame, one long soft shadow, calm empty negative space across the left two-thirds, minimal editorial set. Focal point ~70% across. |
| `hero-jewellery-editorial-mobile` | 1 Opening (phones) | 9:16, ≥ 1800 px tall | The same necklace and plinth composed vertically, necklace falling from the top edge to the centre, warm white ground, generous empty space at the foot of the frame. |
| `collection-necklace-on-body` | 2 Featured collection | 4:5 | Close crop of a woman's collarbone and neck wearing a delicate gold necklace with a small pendant, ivory linen garment, warm natural window light, face out of frame, natural skin texture. |
| `collection-gold-earrings-cutout` | 2 Featured collection | 1:1 | A pair of yellow-gold drop earrings, front view, on seamless pure white (#FFFFFF), faint contact shadow only. |
| `featured-gold-necklace` | 4 Featured product (+ loupe) | 1:1, ≥ 2400 px | A single statement yellow-gold necklace laid flat in a soft U on seamless pure white, centre pendant with fine granulation, symmetrical, faint contact shadow, ultra-sharp detail (the loupe magnifies it 2.5×). |
| `craft-goldsmith-bench` | 6 The craft | 4:5 | A goldsmith's worn wooden bench pin with fine hand tools, coils of gold wire and a half-finished gold ring; one hand entering from the right holding a fine file; warm practical light, documentary. Check the hand closely. |
| `edit-gold-necklace` | 7 Product edit | 1:1 | A yellow-gold necklace on seamless pure white, centred, same light and camera height as the rest of the set. |
| `edit-jhumka-earrings` | 7 Product edit | 1:1 | A pair of gold jhumka earrings with small bead drops on seamless pure white, centred. |
| `edit-gold-bangle` | 7 Product edit | 1:1 | A plain polished gold bangle at a three-quarter angle on seamless pure white, centred. |
| `edit-gold-ring` | 7 Product edit | 1:1 | A gold ring with a single small stone on seamless pure white, centred. |
| `edit-gold-pendant` | 7 Product edit | 1:1 | A gold pendant on a fine chain on seamless pure white, centred. |
| `edit-gold-chain` | 7 Product edit | 1:1 | A fine gold chain loosely coiled on seamless pure white, centred. |
| `bespoke-sketch-to-ring` | 8 Bespoke | 4:3 | Top-down: a pencil and gouache design sketch of a gold ring on cream paper, the finished gold ring resting beside the drawing (right of centre), a pencil at the edge, soft daylight. |

## Not for AI — client material only

| Slot | Why |
| --- | --- |
| Forward archive photo (FWD-01) | It would invent a real family's history. |
| Store photo (VISIT-01) | It must show the real Thane store. |
| Customer stories and press logos | They must be real and attributed. |
| Instagram strip | Pulled live from the client's account. |
