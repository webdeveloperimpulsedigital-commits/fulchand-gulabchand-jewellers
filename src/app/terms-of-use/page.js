import LegalPending from '@/components/LegalPending';

export const metadata = {
  title: 'Terms of Use',
  alternates: { canonical: '/terms-of-use' },
  robots: { index: false, follow: true },
};

export default function TermsOfUse() {
  return <LegalPending title="Terms of Use" />;
}
