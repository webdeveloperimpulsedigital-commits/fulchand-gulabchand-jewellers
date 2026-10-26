# Fulchand Gulabchand Jewellers — website

Homepage built from the approved design canvas **FGJ Homepage** (direction "Held") and the Brand Book · Final (Sept 2026).

Stack: Next.js 15 (App Router, React 19), CSS Modules, no UI or animation libraries. The proposal specifies Next.js with server-side rendering; every page here is prerendered as static HTML.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (includes lint)
npm start          # serve the production build
npm run lint
npm run images     # process images in public/images/ai-jewellery/source
```

Node 20.9 or later. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.example.com`) in production so canonical URLs, Open Graph, the sitemap and structured data use the live domain.

## Structure

```
src/
  app/            layout (fonts, metadata, JSON-LD), homepage, legal pages, 404, robots, sitemap, icons
  sections/       the ten homepage sections, in the approved order
  components/     Header, Footer, MobileVisitBar, ImageSlot, Motif, Reveal, Loupe, SaveButton, Links, Icons, SavedVisit
  content/        site.js (copy, store details, nav) and assets.js (image slots)
  styles/         globals.css (brand tokens and type scale)
  fonts/          self-hosted Jost + Manrope (SIL OFL)
public/images/brand/  logo lockups extracted from FGJ.pdf
```

## Where to change things

- **Copy and store details:** `src/content/site.js`. Every `[bracketed]` string is a placeholder from the approved design awaiting client text.
- **Phone and WhatsApp:** set `store.phone` and `store.whatsapp` in `site.js`. Until then, Call and WhatsApp render as disabled with a note.
- **Images:** drop originals into `public/images/ai-jewellery/source/` using the file names in `AI-IMAGE-PROMPTS.md`, then `npm run images` (runs automatically before dev/build). They are resized to WebP and wired into their slots via `src/content/image-manifest.json`. See `ASSET-REPLACEMENTS.md`.
- **Futura:** when the web licence is bought, replace the two Jost files in `src/app/layout.js` with the licensed Futura woff2 files.

## Behaviour

- Save for My Visit: saved pieces persist in the visitor's browser (localStorage). The header circle shows the count; section 10 shows the saved pieces. The private link, WhatsApp hand-off and appointment attachment need the backend from the proposal.
- Motion: one-time mask/fade reveals on scroll (IntersectionObserver), rail scrolling with a gold progress line, explore panels, and the loupe (active once PROD-01 has a photo). All motion is off under `prefers-reduced-motion`.
- Mobile (≤ 820 px): menu, stacked sections, a 2-column product grid and a sticky Visit · WhatsApp · Call bar.
