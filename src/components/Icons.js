/* Inline stroke icons used across the homepage (decorative: aria-hidden). */

export function ArrowRight({ width = 28 }) {
  return (
    <svg width={width} height="10" viewBox="0 0 28 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <path d="M0 5h26M22 1l4 4-4 4" />
    </svg>
  );
}

export function ArrowShort({ direction = 'right' }) {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      {direction === 'left' ? <path d="M18 5H2M6 1L2 5l4 4" /> : <path d="M0 5h16M12 1l4 4-4 4" />}
    </svg>
  );
}

export function SaveIcon({ saved, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d={saved ? 'M8 12.5l2.6 2.6L16 9.5' : 'M12 8v8M8 12h8'} />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4.2-4.2" />
    </svg>
  );
}

export function MenuIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 8h18M3 16h18" />}
    </svg>
  );
}

export function PlusIcon({ open, className }) {
  return (
    <svg className={className} data-open={open ? 'true' : 'false'} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <path d="M10 2v16M2 10h16" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z" />
    </svg>
  );
}

export function QuoteMark() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="var(--gold)" strokeWidth="1" aria-hidden="true" focusable="false">
      <path d="M2 26V14C2 6 7 2 14 2M24 26V14c0-8 5-12 12-12" />
    </svg>
  );
}
