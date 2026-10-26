import LegalPending from '@/components/LegalPending';

export const metadata = {
  title: 'Cookie Policy',
  alternates: { canonical: '/cookie-policy' },
  robots: { index: false, follow: true },
};

export default function CookiePolicy() {
  return <LegalPending title="Cookie Policy" />;
}
