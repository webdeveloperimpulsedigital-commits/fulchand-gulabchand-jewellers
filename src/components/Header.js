'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { navbarDropdowns, exploreCatalog } from '@/content/site';
import { getAssetUrl } from '@/utils/basePath';
import { useSavedVisit } from './SavedVisit';
import { MenuIcon, SearchIcon } from './Icons';
import styles from './Header.module.css';

const SEARCH_ITEMS = [
  ...(exploreCatalog?.type?.items || []),
  ...(exploreCatalog?.occasion?.items || []),
  ...(exploreCatalog?.collection?.items || []),
  {
    id: 'rajawat-necklace',
    name: 'The Rajawat Collection',
    title: 'Rajawat Chandrika Royal Necklace',
    subtitle: '22KT Gold · BIS Hallmarked · Polki & Rubies',
    description: 'Statement bridal collar with uncut polki diamonds, rubies, and rava beads.',
    image: '/images/ai-jewellery/featured-gold-necklace.webp',
    purity: '22KT Hallmarked Gold',
    craft: 'Nakshi Chasing & Jadau',
  },
];

export default function Header() {
  const { count } = useSavedVisit();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuBtn = useRef(null);
  const navRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);

  // Focus search input on open
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [searchOpen]);

  // Close dropdown or search on click outside or Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };

    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth > 960) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const q = searchQuery.toLowerCase().trim();
  const filteredResults = q
    ? SEARCH_ITEMS.filter((item) => {
        const text = `${item.name || ''} ${item.title || ''} ${item.subtitle || ''} ${item.description || ''} ${item.purity || ''} ${item.craft || ''}`.toLowerCase();
        return text.includes(q);
      })
    : [];

  return (
    <header className={styles.hdr}>
      <div className={styles.inner}>
        {/* Only main home page clickable */}
        <Link href="/" className={styles.logoLink} aria-label="Fulchand Gulabchand Jewellers — home" onClick={closeAll}>
          <Image
            src={getAssetUrl('/images/brand/fgj-horiz.png')}
            alt="Fulchand Gulabchand Jewellers"
            width={1200}
            height={375}
            priority
            sizes="(max-width: 820px) 150px, 196px"
            className={styles.logo}
          />
        </Link>

        {/* Desktop Navigation with Dropdowns */}
        <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
          {/* Main Home Page — Clickable */}
          <Link href="/" className={styles.homeLink} onClick={closeAll}>
            Home
          </Link>

          {/* Dropdown menus: Jewellery, The House, Visit the Store, Legal Pages */}
          {navbarDropdowns.map((menu) => {
            const isOpen = activeDropdown === menu.id;
            return (
              <div
                key={menu.id}
                className={styles.dropdownWrap}
                onMouseEnter={() => setActiveDropdown(menu.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`${styles.navDropdownTrigger} ${isOpen ? styles.triggerActive : ''}`}
                  onClick={() => setActiveDropdown((curr) => (curr === menu.id ? null : menu.id))}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <span>{menu.title}</span>
                  <svg
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown Menu Card (Not clickable - pure text items as requested) */}
                {isOpen && (
                  <div className={`${styles.dropdownCard} ${menu.featured ? styles.dropdownFeatured : ''}`}>
                    <h3 className={styles.dropdownHeading}>{menu.title}</h3>
                    <ul className={styles.dropdownList}>
                      {menu.items.map((item) => (
                        <li key={item} className={styles.dropdownItem}>
                          <span className={styles.itemText}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.dropdownNotice}>
                      Final product categories and collection names will be confirmed from the approved product list.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Utility / Search & Visit Store CTA */}
        <div className={styles.util} ref={searchWrapRef}>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.search} ${searchOpen ? styles.searchBtnActive : ''}`}
            aria-label={searchOpen ? 'Close search' : 'Search the jewellery'}
            aria-expanded={searchOpen}
            onClick={() => {
              setActiveDropdown(null);
              setSearchOpen((prev) => !prev);
            }}
          >
            {searchOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <SearchIcon />
            )}
          </button>
          {/* Saved Visit Count Ring Badge — Hidden for now as requested */}
          {/* <Link href="/#visit" className={styles.iconBtn} aria-label={`My Visit — ${count} saved ${count === 1 ? 'piece' : 'pieces'}`} onClick={closeAll}>
            <span className={styles.savedRing} data-on={count > 0 ? 'true' : 'false'}>
              {count}
            </span>
          </Link> */}
          <Link href="/#visit" className={styles.planLink} onClick={closeAll}>
            Visit Store
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Luxury In-Header Search Overlay (Opens right here, no scrolling) */}
      {searchOpen && (
        <div className={styles.searchBarWrap} role="dialog" aria-label="Search jewellery">
          <div className={`wrap ${styles.searchBarInner}`}>
            <div className={styles.searchField}>
              <SearchIcon />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jewellery, polki, 22KT gold, bridal, jhumkas, necklaces..."
                className={styles.searchInput}
                aria-label="Search jewellery"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className={styles.closeSearchBtn}
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                Close
              </button>
            </div>

            {/* Quick Suggestions when search input is empty */}
            {!searchQuery.trim() ? (
              <div className={styles.quickTags}>
                <span className={styles.tagsLabel}>POPULAR SEARCHES:</span>
                {['Rajawat Collection', 'Bridal Polki', '22KT Temple Gold', 'Jhumkas', 'Kadas & Bangles', 'Bespoke Heirlooms'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={styles.tagBtn}
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              /* Instant Matches */
              <div className={styles.searchResults}>
                {filteredResults.length > 0 ? (
                  <div className={styles.resultsGrid}>
                    {filteredResults.map((item) => (
                      <div key={item.id || item.title} className={styles.resultCard}>
                        {item.image && (
                          <div className={styles.resultThumb}>
                            <Image
                              src={getAssetUrl(item.image)}
                              alt={item.title || item.name}
                              width={60}
                              height={60}
                              className={styles.thumbImg}
                            />
                          </div>
                        )}
                        <div className={styles.resultInfo}>
                          <span className={styles.resultSubtitle}>{item.subtitle || item.purity}</span>
                          <h4 className={styles.resultTitle}>{item.title || item.name}</h4>
                          <p className={styles.resultDesc}>{item.description}</p>
                          <span className={styles.resultCraft}>{item.craft} · {item.purity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <p>No jewellery found matching “{searchQuery}”.</p>
                    <p className={styles.noResultsHint}>Try searching for “Polki”, “Bridal”, “Gold”, “Rajawat”, or “Necklace”.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <nav
        id="mobile-menu"
        className={styles.mobMenu}
        data-open={mobileOpen ? 'true' : 'false'}
        aria-label="Mobile Navigation"
        hidden={!mobileOpen}
      >
        <div className={styles.mobScroll}>
          {/* Main Home Page — Clickable */}
          <Link href="/" className={styles.mobHomeLink} onClick={closeAll}>
            <span>Home</span>
            <span className={styles.liveTag}>Active Page</span>
          </Link>

          {/* All Dropdown sections (Non-clickable items) */}
          <div className={styles.mobSectionsGrid}>
            {navbarDropdowns.map((menu) => (
              <div
                key={menu.id}
                className={`${styles.mobCard} ${menu.featured ? styles.dropdownFeatured : ''}`}
              >
                <h4 className={styles.mobHeading}>{menu.title}</h4>
                <ul className={styles.dropdownList}>
                  {menu.items.map((item) => (
                    <li key={item} className={styles.dropdownItem}>
                      <span className={styles.itemText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Client Notice */}
          <div className={styles.mobNotice}>
            Final product categories and collection names will be confirmed from the approved product list.
          </div>
        </div>
      </nav>
    </header>
  );
}


