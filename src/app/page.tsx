import Link from 'next/link';

import CheckboxGrid from '@/components/ui/icons/checkbox-grid';
import H1 from '@/components/ui/typography/h1';
import H3 from '@/components/ui/typography/h3';
import Quiz from '@/components/quiz/quiz';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-4 pb-20 text-center'>
      <CheckboxGrid className='mb-4 h-28 w-28' />
      <H1 className='text-balance'>No More Frills,</H1>
      <H1 className='text-balance'>Just Thrilling Quizzes</H1>
      <H3 className='text-balance mb-4 text-muted-foreground'>Quizzing with no fuss.</H3>
      <Link
        href='/demo'
        className='inline-flex h-9  items-center justify-center rounded-md bg-primary
        px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors
        hover:bg-primary/90 focus-visible:outline-none
        focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
      >
        Try a quiz
      </Link>
    </main>
  );
}
