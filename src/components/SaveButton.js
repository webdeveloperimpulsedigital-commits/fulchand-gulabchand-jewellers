'use client';

import { useSavedVisit } from './SavedVisit';
import { SaveIcon } from './Icons';
import ui from './ui.module.css';
import styles from './SaveButton.module.css';

/** Save to My Visit. `variant="icon"` for tiles, `"line"` for the featured piece. */
export default function SaveButton({ id, label, variant = 'icon' }) {
  const { isSaved, toggle } = useSavedVisit();
  const saved = isSaved(id);

  if (variant === 'line') {
    return (
      <button type="button" className={ui.btnLine} aria-pressed={saved} onClick={() => toggle(id, label)}>
        <SaveIcon saved={saved} size={16} />
        {saved ? 'Saved to My Visit' : 'Save to My Visit'}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.icon}
      aria-pressed={saved}
      aria-label={saved ? `Saved to My Visit — remove ${label}` : `Save ${label} to My Visit`}
      onClick={() => toggle(id, label)}
    >
      <SaveIcon saved={saved} />
    </button>
  );
}
