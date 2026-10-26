import Link from 'next/link';
import SimplePage from './SimplePage';

/** Legal text is client-supplied (drafting is outside scope). Until then, this page says so and is not indexed. */
export default function LegalPending({ title }) {
  return (
    <SimplePage eyebrow="Legal" title={title}>
      <p>This policy will be published here once it is provided by Fulchand Gulabchand Jewellers.</p>
      <p>
        <Link href="/">Return to the homepage</Link>
      </p>
    </SimplePage>
  );
}
