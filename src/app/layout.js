import localFont from 'next/font/local';
import '@/styles/globals.css';
import { SavedVisitProvider } from '@/components/SavedVisit';
import { store } from '@/content/site';

// Self-hosted (SIL OFL, licences in src/fonts). Futura is the brand display
// face but needs a web licence (pending); Jost is the approved interim
// stand-in (Creative Direction, approval item 4). To switch, replace the
// Jost files below with the licensed Futura woff2 files.
const jost = localFont({
  src: [
    { path: '../fonts/jost-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/jost-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-jost',
  display: 'swap',
  fallback: ['Futura', 'Futura PT', 'Century Gothic', 'sans-serif'],
});
const manrope = localFont({
  src: [
    { path: '../fonts/manrope-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/manrope-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/manrope-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/manrope-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://impulsedigital.co.in/fulchand-gulabchand-jewellers';
const description =
  'Fulchand Gulabchand Jewellers, Gokhale Road, Naupada, Thane (W). Explore the jewellery, save the pieces you love and plan your visit to the store.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fulchand Gulabchand Jewellers — The house of gold, Thane',
    template: '%s · Fulchand Gulabchand Jewellers',
  },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: store.name,
    title: 'Fulchand Gulabchand Jewellers — The house of gold',
    description,
    url: '/',
    images: [{ url: `${siteUrl}/images/brand/fgj-stacked.png`, width: 1200, height: 1430, alt: store.name }],
  },
  twitter: {
    card: 'summary',
    title: store.name,
    description,
    images: [`${siteUrl}/images/brand/fgj-stacked.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

// Structured data limited to verified facts (brand book + proposal).
// Phone, hours, PIN code and founding year are added once the client confirms them.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: store.name,
  url: siteUrl,
  logo: `${siteUrl}/images/brand/fgj-mark.png`,
  image: `${siteUrl}/images/brand/fgj-stacked.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: store.streetAddress,
    addressLocality: store.locality,
    addressRegion: store.region,
    addressCountry: store.country,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${jost.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SavedVisitProvider>{children}</SavedVisitProvider>
      </body>
    </html>
  );
}
