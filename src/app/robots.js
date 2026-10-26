export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://impulsedigital.co.in/fulchand-gulabchand-jewellers';

export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${siteUrl}/sitemap.xml` };
}
