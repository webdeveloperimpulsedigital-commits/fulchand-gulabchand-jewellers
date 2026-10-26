'use client';

import ImageSlot from '@/components/ImageSlot';
import { ButtonLink } from '@/components/Links';
import { WhatsAppIcon } from '@/components/Icons';
import { useSavedVisit } from '@/components/SavedVisit';
import { telHref, whatsappHref } from '@/components/contact';
import { assets } from '@/content/assets';
import { store } from '@/content/site';
import ui from '@/components/ui.module.css';
import styles from './PlanVisit.module.css';

/** 10 · Plan your visit — store, details and the four visit actions. */
export default function PlanVisit() {
  const { count } = useSavedVisit();
  const wa = whatsappHref(
    count > 0
      ? `Hello, I would like to plan a visit to see the ${count} piece${count === 1 ? '' : 's'} I saved on your website.`
      : undefined
  );
  const pending = !telHref || !wa;

  return (
    <section className="sec" id="visit" aria-labelledby="visit-h">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.media}>
            <ImageSlot asset={assets.store} tone="blush" motif="store" sizes="(max-width: 820px) 100vw, 48vw" />
          </div>
          <div className={styles.copy}>
            <p className="label">Visit the store</p>
            <h2 className="h1" id="visit-h">
              Come and hold it.
            </h2>

            <div className={styles.facts}>
              <div>
                <p className={`label ${styles.factLabel}`}>Address</p>
                <address className={styles.address}>
                  {store.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <p className={`label ${styles.factLabel}`}>Hours</p>
                <p className={styles.hours}>
                  {store.hours[0]}
                  <br />
                  {store.hours[1]}
                </p>
              </div>
            </div>

            {count > 0 && (
              <div className={styles.mine}>
                {Array.from({ length: Math.min(count, 5) }).map((_, k) => (
                  <span key={k} className={styles.chip} aria-hidden="true" />
                ))}
                <p className="caption">
                  {count === 1 ? 'Bring this piece to your visit' : `Bring these ${count} pieces to your visit`}
                </p>
              </div>
            )}

            <div className={styles.actions}>
              {/* Plan Your Visit page (appointment form) is a separate in-scope page, not built yet. */}
              <ButtonLink href="#visit">Plan Your Visit</ButtonLink>
              {wa ? (
                <a className={ui.btnLine} href={wa} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              ) : (
                <button type="button" className={ui.btnLine} disabled aria-describedby="contact-pending">
                  <WhatsAppIcon />
                  WhatsApp
                </button>
              )}
              {telHref ? (
                <a className={ui.btnLine} href={telHref}>
                  Call
                </a>
              ) : (
                <button type="button" className={ui.btnLine} disabled aria-describedby="contact-pending">
                  Call
                </button>
              )}
              <a className={ui.btnLine} href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
                Directions<span className="visually-hidden"> (opens Google Maps)</span>
              </a>
            </div>
            {pending && (
              <p className="caption" id="contact-pending">
                Phone and WhatsApp number to be added by the store.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
