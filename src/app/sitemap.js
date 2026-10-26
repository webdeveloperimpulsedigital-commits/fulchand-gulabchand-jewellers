export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://impulsedigital.co.in/fulchand-gulabchand-jewellers';

// Legal pages stay out until their text is published (they are noindex for now).
export default function sitemap() {
  return [{ url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 }];
}
