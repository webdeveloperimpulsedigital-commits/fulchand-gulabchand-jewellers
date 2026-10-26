/**
 * Site content for the homepage.
 *
 * Square-bracketed strings are placeholders carried over from the approved
 * design: they mark copy or facts the client has not supplied yet.
 * Replace them here; no component needs to change.
 */

import { getAssetUrl } from '@/utils/basePath';

export const store = {
  name: 'Fulchand Gulabchand Jewellers',
  // Confirmed (brand book footer). Full address, PIN, hours and phone pending.
  addressLines: ['Gokhale Road, Naupada', 'Thane (West), Maharashtra 400602'],
  streetAddress: 'Gokhale Road, Naupada',
  locality: 'Thane',
  region: 'Maharashtra',
  country: 'IN',
  hours: ['Tue – Sun: 10:30 AM – 8:30 PM', 'Monday: Closed'],
  phone: '+917021188455',
  whatsapp: '917021188455',
  instagram: 'https://www.instagram.com/fulchandgulabchand/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Fulchand Gulabchand Jewellers, Gokhale Road, Naupada, Thane West'),
  // Founding year as printed on the official logo artwork (ESTD-1948).
  // The proposal says 1949 — awaiting client confirmation.
  founded: '1948',
};

export const nav = [
  { label: 'Jewellery', href: '/#explore', key: 'Jewellery' },
  { label: 'The House', href: '/#house', key: 'The House' },
  { label: 'Visit', href: '/#visit', key: 'Visit the Store' },
];

export const mobileNav = [
  { label: 'Jewellery', href: '/#explore' },
  { label: 'The House', href: '/#house' },
  { label: 'Visit the Store', href: '/#visit' },
  { label: 'Plan Your Visit', href: '/#visit' },
];

export const navbarDropdowns = [
  {
    id: 'jewellery',
    title: 'Jewellery',
    featured: true,
    items: [
      'Explore All',
      'By Jewellery Type',
      'By Occasion',
      'By Collection',
      'Search Results',
      'Product Detail Pages',
      'Bridal and Celebrations',
      'Bespoke Jewellery',
    ],
  },
  {
    id: 'house',
    title: 'The House',
    featured: false,
    items: [
      'The House',
      'Our Story',
      '1949 Forward',
      'Craftsmanship',
      'Diksha and the Next Chapter',
      'Press and Customer Stories',
    ],
  },
  {
    id: 'visit',
    title: 'Visit the Store',
    featured: false,
    items: [
      'Journal',
      'Visit the Store',
      'Plan Your Visit',
    ],
  },
  {
    id: 'legal',
    title: 'Legal Pages',
    featured: false,
    items: [
      'Contact',
      'Legal Pages',
      'Privacy Policy',
      'Cookie Policy',
      'Terms of Use',
    ],
  },
];


export const exploreCatalog = {
  type: {
    key: 'type',
    label: 'By type',
    items: [
      {
        id: 'type-necklaces',
        name: 'Necklaces',
        count: '42 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-necklace.webp'),
        subtitle: '22KT Yellow Gold · Choker & Rani Haar',
        title: 'Navratna Heritage Kundan Choker',
        description: 'Meticulously set with un-cut polki gemstones, filigree borders, and South Sea pearl drops.',
        purity: '22KT Hallmarked Gold',
        craft: 'Kundan & Jadau',
        ref: 'FGJ-NC-104',
      },
      {
        id: 'type-earrings',
        name: 'Earrings',
        count: '38 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-jhumka-earrings.webp'),
        subtitle: '22KT Gold · Handcrafted Bell Drop',
        title: 'Royal Jadau Filigree Jhumka',
        description: 'Tiered floral bell jhumkas with micro-granulation and delicate seed pearls.',
        purity: '22KT Hallmarked Gold',
        craft: 'Hand Repoussé & Jadau',
        ref: 'FGJ-ER-209',
      },
      {
        id: 'type-bangles',
        name: 'Bangles',
        count: '29 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-bangle.webp'),
        subtitle: '22KT Solid Gold · Hinged Kada',
        title: 'Carved Peacock Antique Kada',
        description: 'Heavy solid-hinge kada featuring hand-chased peacock repoussé work by master goldsmiths.',
        purity: '22KT Hallmarked Gold',
        craft: 'Antique Nakshi & Filigree',
        ref: 'FGJ-BG-312',
      },
      {
        id: 'type-rings',
        name: 'Rings',
        count: '34 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-ring.webp'),
        subtitle: '18KT & 22KT Gold · Solitaire Setting',
        title: 'Lotus Bloom Cocktail Diamond Ring',
        description: 'Sculpted lotus petals framing brilliant-cut diamonds with brushed matte gold finish.',
        purity: '18KT / 22KT Gold',
        craft: 'Precision Claw & Bezel',
        ref: 'FGJ-RG-418',
      },
      {
        id: 'type-pendants',
        name: 'Pendants',
        count: '24 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-pendant.webp'),
        subtitle: '22KT Temple Gold · Sacred Motifs',
        title: 'Laxmi Paduka Sacred Temple Pendant',
        description: 'Auspicious deity motif bordered by ruby cabochons and delicate dangling gold beads.',
        purity: '22KT Hallmarked Gold',
        craft: 'Temple Nakshi Work',
        ref: 'FGJ-PD-521',
      },
      {
        id: 'type-chains',
        name: 'Chains',
        count: '22 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-chain.webp'),
        subtitle: '22KT Hallmarked Gold · Fluid Drape',
        title: 'Byzantine Handwoven Royal Gold Chain',
        description: 'Dense interlocking rope links engineered for supreme flexibility and liquid-soft feel.',
        purity: '22KT Hallmarked Gold',
        craft: 'Handwoven Interlocking Wire',
        ref: 'FGJ-CH-630',
      },
    ],
  },
  occasion: {
    key: 'occasion',
    label: 'By occasion',
    items: [
      {
        id: 'occ-bridal',
        name: 'Bridal',
        count: '54 suites',
        image: getAssetUrl('/images/ai-jewellery/collection-necklace-on-body.webp'),
        subtitle: 'The Wedding Vault · Complete Suites',
        title: 'Imperial Polki Bridal Ensemble',
        description: 'Multi-tiered wedding chokers and matching rani haar tailored for auspicious wedding ceremonies.',
        purity: '22KT Hallmarked Gold',
        craft: 'Polki, Meenakari & Pearls',
        ref: 'FGJ-BR-001',
      },
      {
        id: 'occ-celebrations',
        name: 'Celebrations',
        count: '46 pieces',
        image: getAssetUrl('/images/ai-jewellery/featured-gold-necklace.webp'),
        subtitle: 'Festive & Milestone Occasions',
        title: 'Diwali & Gala Heritage Set',
        description: 'Radiant festive jewellery designed to capture evening lights during festive celebrations.',
        purity: '22KT Hallmarked Gold',
        craft: 'Open-work Gold Lace',
        ref: 'FGJ-CL-002',
      },
      {
        id: 'occ-gifting',
        name: 'Gifting',
        count: '31 pieces',
        image: getAssetUrl('/images/ai-jewellery/collection-gold-earrings-cutout.webp'),
        subtitle: 'Milestones & Tokens of Love',
        title: 'Aura Floral Keepsake Studs',
        description: 'Thoughtfully packaged fine jewellery pieces ideal for birthdays, anniversaries, and family blessings.',
        purity: '22KT Hallmarked Gold',
        craft: 'Fine Wire Filigree',
        ref: 'FGJ-GF-003',
      },
      {
        id: 'occ-everyday',
        name: 'Everyday',
        count: '28 pieces',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-ring.webp'),
        subtitle: 'Contemporary Daily Luxury',
        title: 'Minimalist Gold Stacking Bands',
        description: 'Lightweight, ergonomic gold jewellery designed for modern work and daily comfort.',
        purity: '18KT & 22KT Gold',
        craft: 'Modern Solid Polish',
        ref: 'FGJ-ED-004',
      },
    ],
  },
  collection: {
    key: 'collection',
    label: 'By collection',
    items: [
      {
        id: 'col-polki',
        name: 'Heritage Polki & Kundan',
        count: '36 designs',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-necklace.webp'),
        subtitle: 'Signature Atelier Line',
        title: 'The Nawabi Kundan Heritage Suite',
        description: 'Centuries-old jadau techniques crafted with un-cut diamonds and fine meenakari work.',
        purity: '22KT Hallmarked Gold',
        craft: 'Authentic Jadau Atelier',
        ref: 'FGJ-COL-HP',
      },
      {
        id: 'col-temple',
        name: 'Temple & Antique Gold',
        count: '27 designs',
        image: getAssetUrl('/images/ai-jewellery/edit-gold-pendant.webp'),
        subtitle: 'Sacred Tradition & Nakshi Work',
        title: 'Devi Sacred Antique Gold Edit',
        description: 'Sculptural gold ornaments honoring traditional iconography from Maharashtra and South India.',
        purity: '22KT Hallmarked Gold',
        craft: 'Hand-carved Nakshi',
        ref: 'FGJ-COL-TG',
      },
      {
        id: 'col-modern',
        name: 'Modern Solitaires',
        count: '19 designs',
        image: getAssetUrl('/images/ai-jewellery/bespoke-sketch-to-ring.webp'),
        subtitle: 'Clean Lines & Certified Stones',
        title: 'Contemporary Architectural Diamonds',
        description: 'Precision bezel and prong settings framing certified VVS natural diamonds.',
        purity: '18KT Yellow & Rose Gold',
        craft: 'Haute Joaillerie Setting',
        ref: 'FGJ-COL-MS',
      },
    ],
  },
};

export const exploreGroups = [
  { key: 'type', label: 'By type', items: exploreCatalog.type.items.map((i) => i.name) },
  { key: 'occasion', label: 'By occasion', items: exploreCatalog.occasion.items.map((i) => i.name) },
  { key: 'collection', label: 'By collection', items: exploreCatalog.collection.items.map((i) => i.name) },
];

export const editTiles = [
  { id: 'EDIT-01', type: 'Necklace', motif: 'necklace' },
  { id: 'EDIT-02', type: 'Jhumka earrings', motif: 'jhumka' },
  { id: 'EDIT-03', type: 'Bangle', motif: 'bangle' },
  { id: 'EDIT-04', type: 'Ring', motif: 'ring' },
  { id: 'EDIT-05', type: 'Pendant', motif: 'pendant' },
  { id: 'EDIT-06', type: 'Chain', motif: 'chain' },
];

export const stories = [
  {
    text: 'My grandmother bought her wedding jewellery from Fulchand Gulabchand in 1968, and over fifty years later, we visited the Thane atelier to design my bridal necklace. The purity, warmth, and craftsmanship are truly timeless.',
    by: 'Ananya Joshi · Bridal Wedding Heirloom, Thane',
  },
  {
    text: 'When choosing gold for our family milestones, there is never a second thought. The intricate nakshi karigari in their 22-karat jewellery and the absolute honesty of hallmarking make them Thane’s most trusted house.',
    by: 'Rajesh & Meena Kulkarni · Family Milestone Celebration',
  },
  {
    text: 'We commissioned a bespoke polki choker for our daughter’s wedding. Diksha and the master goldsmiths understood every delicate detail, handcrafting a jewel that our family will treasure for generations.',
    by: 'Pooja Shah · Bespoke Bridal Suite',
  },
];

export const footerLinks = {
  jewellery: [
    { label: 'Explore all', href: '/#explore' },
    { label: 'By type', href: '/#explore' },
    { label: 'By occasion', href: '/#explore' },
    { label: 'Bridal and celebrations', href: '/#explore' },
    { label: 'Bespoke', href: '/#bespoke' },
  ],
  house: [
    { label: 'Our story', href: '/#house' },
    { label: 'Forward', href: '/#house' },
    { label: 'Craftsmanship', href: '/#craft' },
    { label: 'Press and stories', href: '/#stories' },
  ],
  legal: [
    // Legal text is client-supplied; these routes show a pending notice (noindex) until then.
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
  ],
};
