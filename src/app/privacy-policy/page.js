import LegalPending from '@/components/LegalPending';

export const metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return <LegalPending title="Privacy Policy" />;
}
