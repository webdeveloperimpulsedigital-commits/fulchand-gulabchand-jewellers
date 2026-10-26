'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Save for My Visit — front-end state only.
 * Saved piece ids persist in this browser (localStorage). The private share
 * link, WhatsApp send and appointment attachment need the backend described
 * in the proposal and are not built yet.
 */
const STORAGE_KEY = 'fgj:my-visit';
const SavedVisitContext = createContext(null);

export function SavedVisitProvider({ children }) {
  const [saved, setSaved] = useState([]);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSaved(parsed.filter((x) => typeof x === 'string'));
      }
    } catch {
      /* storage unavailable — keep in memory */
    }
  }, []);

  const persist = (next) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toggle = useCallback(
    (id, label) => {
      const wasSaved = saved.includes(id);
      const next = wasSaved ? saved.filter((x) => x !== id) : [...saved, id];
      setSaved(next);
      persist(next);
      setAnnouncement(
        wasSaved ? `${label} removed from My Visit. ${next.length} saved.` : `${label} saved to My Visit. ${next.length} saved.`
      );
    },
    [saved]
  );

  const value = useMemo(
    () => ({ saved, count: saved.length, isSaved: (id) => saved.includes(id), toggle }),
    [saved, toggle]
  );

  return (
    <SavedVisitContext.Provider value={value}>
      {children}
      <p className="visually-hidden" aria-live="polite" role="status">
        {announcement}
      </p>
    </SavedVisitContext.Provider>
  );
}

export function useSavedVisit() {
  const ctx = useContext(SavedVisitContext);
  if (!ctx) throw new Error('useSavedVisit must be used inside SavedVisitProvider');
  return ctx;
}
