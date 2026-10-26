import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl } from '@/utils/basePath';

export const metadata = {
  title: 'Brand Identity Options — Fulchand Gulabchand Jewellers',
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    id: 'option-1',
    num: '01',
    title: "Option 1: The Goldsmith's Hallmark Stamp",
    subtitle: 'Signature Authenticity Seals on Images',
    badge: 'Recommended for Product Photography',
    img: '/images/options/option-1-hallmark-seal.png',
    desc: 'A discrete, embossed dark-glass & gold hallmark seal (EST. 1948 · FG) placed directly in the corner of key jewellery pieces. Like a royal goldsmith’s hallmark or certificate of 22KT purity stamped on the piece.',
    benefits: [
      'Authenticates every image as an exclusive Fulchand Gulabchand creation',
      'Leaves 100% of body paragraphs clean, spacious, and easily readable',
      'Protects brand attribution across social shares and screenshots',
    ],
  },
  {
    id: 'option-2',
    num: '02',
    title: 'Option 2: Editorial Chapter Crests',
    subtitle: 'Between-Section Architectural Dividers',
    badge: 'Recommended for Site-Wide Rhythm',
    img: '/images/options/option-2-chapter-crest.png',
    desc: 'Instead of plain blank gaps between sections, a centered double-gold crest with the FG monogram and subtle hairlines introduces each new section (FULCHAND GULABCHAND · EST. 1948).',
    benefits: [
      'Rhythmic brand pacing: as visitors scroll, each section is introduced by the official house crest',
      'Completely distinct from generic jewellery websites; gives the site a royal book chapter feel',
      'Zero collision with product photos or text readability',
    ],
  },
  {
    id: 'option-3',
    num: '03',
    title: 'Option 3: Architectural Gold Framing & Margin Signature',
    subtitle: 'Gallery Corner Accents & Negative-Space Monogram',
    badge: 'Recommended for Bespoke Editorial Look',
    img: '/images/options/option-3-gold-framing.png',
    desc: 'Image containers are framed with fine 22KT gold artisanal corner brackets, and the FG monogram subtly floats in the far outer margin off-screen without ever overlapping copy.',
    benefits: [
      'Turns ordinary photos into curated gallery exhibits with gold frames',
      'Margin monogram gives the brand aura without colliding with reading text',
      'Gives every section an unmistakable, custom architectural identity',
    ],
  },
];

export default function BrandOptionsPage() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh', padding: '60px 24px 120px', fontFamily: 'system-ui, sans-serif', color: '#180909' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '64px', borderBottom: '1px solid #DECFA8', paddingBottom: '40px' }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.25em', color: '#B08D3F', fontWeight: '700', textTransform: 'uppercase' }}>
            Fulchand Gulabchand Jewellers · Design Presentation
          </span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '600', margin: '14px 0 16px', color: '#180909' }}>
            Brand Identity Visual Options
          </h1>
          <p style={{ fontSize: '16px', color: '#666666', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6' }}>
            Curated visual directions to integrate the Fulchand Gulabchand brand into every section and image—making the website distinct from any other jewellery site while preserving 100% text readability.
          </p>
        </header>

        {/* Options Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {OPTIONS.map((opt) => (
            <article
              key={opt.id}
              id={opt.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #EFE6DA',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              }}
            >
              {/* Option Bar */}
              <div style={{ background: '#180909', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                  <span style={{ color: '#CCAC78', fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em' }}>{opt.num}</span>
                  <h2 style={{ margin: 0, color: '#FFFFFF', fontSize: '18px', fontWeight: '600', letterSpacing: '0.04em' }}>{opt.title}</h2>
                </div>
                <span style={{ background: 'rgba(204, 172, 120, 0.2)', color: '#EAE4D8', fontSize: '11px', letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  {opt.badge}
                </span>
              </div>

              {/* Large Visual Render Image */}
              <div style={{ padding: '24px', background: '#F5EFEB', borderBottom: '1px solid #EFE6DA' }}>
                <img
                  src={getAssetUrl(opt.img)}
                  alt={opt.title}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                />
              </div>

              {/* Details & Benefits */}
              <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B08D3F', margin: '0 0 10px' }}>
                    Concept Overview
                  </h3>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#444444' }}>
                    {opt.desc}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B08D3F', margin: '0 0 10px' }}>
                    Why Senior Management Will Love It
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.7', color: '#333333' }}>
                    {opt.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#180909',
              color: '#CCAC78',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ← Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
