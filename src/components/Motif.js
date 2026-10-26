/*
 * Gold hairline motifs shown inside concept image slots until photography
 * arrives — the approved design's placeholder treatment ("The Gold Line").
 */
const MOTIFS = {
  hero: {
    viewBox: '0 0 320 200',
    body: (
      <>
        <path d="M40 20 C 90 170, 230 170, 280 20" />
        <path d="M60 22 C 105 150, 215 150, 260 22" />
        <circle cx="160" cy="150" r="10" />
        <path d="M160 160 L152 182 L160 196 L168 182 Z" />
      </>
    ),
  },
  onBody: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M30 30 C 60 130, 140 130, 170 30" />
        <circle cx="100" cy="112" r="7" />
        <path d="M70 30 C 80 60, 120 60, 130 30" strokeDasharray="2 4" />
      </>
    ),
  },
  earrings: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M70 40v20M130 40v20" />
        <circle cx="70" cy="78" r="16" />
        <circle cx="130" cy="78" r="16" />
        <path d="M54 96 L70 150 L86 96 M114 96 L130 150 L146 96" />
      </>
    ),
  },
  product: {
    viewBox: '0 0 220 220',
    body: (
      <>
        <path d="M30 30 C 50 180, 170 180, 190 30" />
        <path d="M44 34 C 64 160, 156 160, 176 34" />
        <circle cx="110" cy="158" r="14" />
        <circle cx="110" cy="158" r="5" />
        <path d="M110 172 L100 196 L110 210 L120 196 Z" />
      </>
    ),
  },
  craft: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M20 150 H180" />
        <path d="M60 150 L95 70 L105 74 L72 150" />
        <circle cx="130" cy="128" r="18" />
        <path d="M150 60 l20 -20 M146 64 l8 8" />
      </>
    ),
  },
  bespoke: {
    viewBox: '0 0 260 180',
    body: (
      <>
        <rect x="20" y="20" width="120" height="140" strokeDasharray="2 4" />
        <circle cx="80" cy="96" r="30" strokeDasharray="3 3" />
        <path d="M70 66 L80 52 L90 66" strokeDasharray="3 3" />
        <circle cx="196" cy="104" r="30" />
        <path d="M186 74 L196 60 L206 74 Z" />
      </>
    ),
  },
  store: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M30 170 V70 L100 30 L170 70 V170 Z" />
        <path d="M80 170 V110 H120 V170" />
      </>
    ),
  },
  necklace: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M40 40 C 60 160, 140 160, 160 40" />
        <circle cx="100" cy="136" r="8" />
      </>
    ),
  },
  jhumka: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M100 30v24" />
        <path d="M70 120 Q100 60 130 120 Z" />
        <circle cx="85" cy="134" r="3" />
        <circle cx="100" cy="138" r="3" />
        <circle cx="115" cy="134" r="3" />
      </>
    ),
  },
  bangle: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <ellipse cx="100" cy="100" rx="64" ry="40" />
        <ellipse cx="100" cy="100" rx="54" ry="31" />
      </>
    ),
  },
  ring: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <circle cx="100" cy="118" r="44" />
        <path d="M88 74 L100 56 L112 74 Z" />
      </>
    ),
  },
  pendant: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M60 30 L100 90 L140 30" />
        <path d="M100 90 L80 120 L100 160 L120 120 Z" />
      </>
    ),
  },
  chain: {
    viewBox: '0 0 200 200',
    body: (
      <>
        <path d="M30 60 C 60 150, 140 150, 170 60" />
        <path d="M38 64 C 66 140, 134 140, 162 64" strokeDasharray="3 3" />
      </>
    ),
  },
};

export default function Motif({ name, className }) {
  const m = MOTIFS[name];
  if (!m) return null;
  return (
    <svg className={className} viewBox={m.viewBox} fill="none" stroke="var(--gold)" strokeWidth="1" aria-hidden="true" focusable="false">
      {m.body}
    </svg>
  );
}
