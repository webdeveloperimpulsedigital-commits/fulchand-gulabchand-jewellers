import Header from './Header';
import Footer from './Footer';
import styles from './SimplePage.module.css';

/** Minimal shell for legal pages and 404 — same header, footer and type system as the homepage. */
export default function SimplePage({ eyebrow, title, children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className={`wrap ${styles.main}`}>
        <p className="label">{eyebrow}</p>
        <h1 className="h1">{title}</h1>
        <hr className="rule" />
        <div className={styles.body}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
