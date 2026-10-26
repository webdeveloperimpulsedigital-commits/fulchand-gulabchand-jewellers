# Fulchand Gulabchand Jewellers — Development Rules

## Brand Typography Policy (MANDATORY)

In any section or component created or edited in this project, **ONLY the official brand typography MUST be used**:

1. **Brand Display & Headings:**
   - Always use: `var(--font-display)` or `var(--font-display, var(--font-jost), 'Futura', sans-serif)`
   - Typeface: **Futura** (interim licensed stand-in: self-hosted **Jost**)
   - Applied to: All `h1`, `h2`, `h3`, section headlines, titles, callouts, and chapter markers.

2. **Brand Body & Paragraphs:**
   - Always use: `var(--font-body)` or `var(--font-body, var(--font-manrope), sans-serif)`
   - Typeface: **Manrope** (self-hosted in `src/fonts/`)
   - Applied to: All paragraphs, lead copy, captions, buttons, and links.

3. **Strictly Prohibited:**
   - **DO NOT** use generic serif fonts (`Playfair Display`, `Cormorant Garamond`, `RomanaBT`, `Times New Roman`, or `Georgia`).
   - If an external reference (e.g. Nída Tabba) uses a serif font, **always adapt it to the Fulchand Gulabchand brand font** (`var(--font-display)` / `var(--font-body)`).

## Single-Change Build Policy (MANDATORY)
- **DO NOT** run `npm run build` on every single change.
- Rely strictly on Next.js dev mode Fast Refresh on `http://localhost:3000`.

## Brand CTA Color Policy (MANDATORY)
- **Every CTA button, pill button, and primary action link** MUST use our official brand red:
  - Base: `var(--crimson, #A70000)`
  - Hover: `var(--crimson-deep, #7A0000)`
  - Text on buttons: `#ffffff`
  - Text on line links: `var(--crimson, #A70000)` with `var(--crimson, #A70000)` underline.

