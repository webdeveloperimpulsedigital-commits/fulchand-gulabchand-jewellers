import Link from 'next/link';
import SimplePage from '@/components/SimplePage';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <SimplePage eyebrow="404" title="This page could not be found.">
      <p>The page may have moved. Everything on the site starts from the homepage.</p>
      <p>
        <Link href="/">Return to the homepage</Link>
      </p>
    </SimplePage>
  );
}
