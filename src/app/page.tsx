import Link from 'next/link';
import ArrowRight from '@/icons/arrow-right';
import CheckboxGrid from '@/icons/checkbox-grid';
import H1 from '@/typography/h1';
import H3 from '@/typography/h3';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-4 pb-20 text-center'>
      <CheckboxGrid className='mb-4 h-28 w-28' />
      <H1 className='text-balance'>No More Frills,</H1>
      <H1 className='text-balance'>Just Thrilling Quizzes</H1>
      <H3 className='text-balance mb-4 text-muted-foreground'>Quizzing with no fuss.</H3>

      <div className='flex flex-row items-center gap-2'>
        <Link
          href='/quiz-builder'
          className={`inline-flex h-9 items-center justify-center rounded-md border border-input 
          bg-transparent px-4 py-2 text-sm font-medium shadow-sm
          transition-colors hover:bg-accent hover:text-accent-foreground
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
          disabled:pointer-events-none disabled:opacity-50`}
        >
          Quiz builder
        </Link>

        <Link
          href='/demo'
          className='inline-flex h-9  items-center justify-center gap-2 rounded-md bg-primary
          px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors
          hover:bg-primary/90 focus-visible:outline-none
          focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
        >
          Demo
          <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
