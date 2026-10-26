import { ArrowRight } from './Icons';
import ui from './ui.module.css';

/** Text link with the gold underline; `tone="crimson"` marks the section's single crimson moment. */
export function TextLink({ href, children, tone, arrow = true, className = '', ...rest }) {
  const toneClass = tone === 'crimson' ? ui.crimson : tone === 'onDark' ? ui.onDark : '';
  return (
    <a href={href} className={`${ui.tlink} ${toneClass} ${className}`} {...rest}>
      {children}
      {arrow && <ArrowRight />}
    </a>
  );
}

export function ButtonLink({ href, children, variant = 'primary', className = '', ...rest }) {
  return (
    <a href={href} className={`${variant === 'primary' ? ui.btn : ui.btnLine} ${className}`} {...rest}>
      {children}
    </a>
  );
}
