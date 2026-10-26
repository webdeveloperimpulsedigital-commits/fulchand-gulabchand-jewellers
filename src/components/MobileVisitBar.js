import Link from 'next/link';
import { telHref, whatsappHref, instagramHref } from './contact';
import styles from './MobileVisitBar.module.css';

/** Sticky Visit · WhatsApp · Instagram · Call bar, shown at phone width only. */
export default function MobileVisitBar() {
  const wa = whatsappHref();
  return (
    <nav className={styles.bar} aria-label="Visit and contact actions">
      <Link className={styles.go} href="/#visit">
        Visit
      </Link>
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Fulchand Gulabchand Jewellers">
        WhatsApp
      </a>
      <a href={instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram @fulchandgulabchand">
        Instagram
      </a>
      {telHref && (
        <a href={telHref} aria-label="Call Fulchand Gulabchand Jewellers">
          Call
        </a>
      )}
    </nav>
  );
}
