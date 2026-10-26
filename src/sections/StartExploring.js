'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAssetUrl } from '@/utils/basePath';
import { exploreCatalog } from '@/content/site';
import SaveButton from '@/components/SaveButton';
import styles from './StartExploring.module.css';

const TABS = [
  { key: 'type', label: 'By type' },
  { key: 'occasion', label: 'By occasion' },
  { key: 'collection', label: 'By collection' },
];

/**
 * Start exploring — interactive catalogue explorer.
 * Allows visitors to browse by Type, Occasion, or Collection
 * with an interactive live piece preview, specs, and Save to Visit action.
 */
export default function StartExploring() {
  const [activeTab, setActiveTab] = useState('type');
  const [selectedId, setSelectedId] = useState('type-necklaces');

  const currentGroup = exploreCatalog[activeTab] || exploreCatalog.type;
  const currentItems = currentGroup.items;

  // Active selected item for preview
  const activeItem =
    currentItems.find((i) => i.id === selectedId) || currentItems[0];

  const handleTabChange = (key) => {
    setActiveTab(key);
    const newGroup = exploreCatalog[key];
    if (newGroup && newGroup.items.length > 0) {
      setSelectedId(newGroup.items[0].id);
    }
  };

  return (
    <section id="explore" className={styles.section} aria-labelledby="ex-h">
      <div className="wrap">
        {/* Section Header */}
        <div className={styles.head}>
          <h2 className="h2" id="ex-h">
            Start exploring
          </h2>
          <p className="caption">About 200 pieces · no prices online</p>
        </div>

        {/* 3 Main Category Tabs */}
        <div className={styles.tabsRow} role="tablist" aria-label="Explore routes">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.key}`}
                id={`tab-${tab.key}`}
                className={`${styles.tabBtn} ${isActive ? styles.tabActive : ''}`}
                onClick={() => handleTabChange(tab.key)}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabIcon} aria-hidden="true">
                  {isActive ? '−' : '+'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area: Left Menu + Right Showcase Preview */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className={styles.explorerBody}
        >
          {/* Left Column: Subcategory Items List */}
          <div className={styles.categoryList}>
            {currentItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.itemBtn} ${isSelected ? styles.itemSelected : ''}`}
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isSelected}
                >
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemCount}>{item.count}</span>
                  </div>
                  <span className={`${styles.itemIndicator} ${isSelected ? styles.indicatorActive : ''}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Curated Showcase Preview */}
          <div className={styles.previewContainer}>
            <article className={styles.previewCard}>
              {/* Product Visual */}
              <div className={styles.imageCol}>
                <div className={styles.imageWrap}>
                  <Image
                    src={getAssetUrl(activeItem.image)}
                    alt={activeItem.title}
                    width={720}
                    height={720}
                    sizes="(max-width: 820px) 100vw, 40vw"
                    className={styles.productImg}
                    priority
                  />
                  <span className={styles.goldAccentBorder} aria-hidden="true" />
                </div>
              </div>

              {/* Product Details & Actions */}
              <div className={styles.detailsCol}>
                <div className={styles.eyebrowTag}>{activeItem.subtitle}</div>
                <h3 className={styles.pieceTitle}>{activeItem.title}</h3>
                <p className={styles.pieceDesc}>{activeItem.description}</p>

                {/* Craft Specs */}
                <div className={styles.specsGrid}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Purity</span>
                    <span className={styles.specValue}>{activeItem.purity}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Artistry</span>
                    <span className={styles.specValue}>{activeItem.craft}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Ref Code</span>
                    <span className={styles.specValue}>{activeItem.ref}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Viewing</span>
                    <span className={styles.specValue}>Thane Boutique</span>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className={styles.actionRow}>
                  <SaveButton id={activeItem.id} label={activeItem.title} variant="line" />
                  <a href="#visit" className={styles.bookViewingBtn}>
                    Book Viewing in Store →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
