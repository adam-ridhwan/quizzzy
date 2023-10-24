'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CheckboxGrid from '@/icons/checkbox-grid';
import H4 from '@/typography/h4';

import ThemeButton from '@/components/theme-button';

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <header className='flex h-14 flex-row items-center'>
        <div className='flex flex-1 items-center gap-2'>
          <Link href='/' className='flex flex-row items-center gap-2 text-lg font-bold'>
            <CheckboxGrid />
            <span className='hidden sm:flex'>Quizzzy</span>
          </Link>
        </div>

        {pathname === '/demo' && <H4>Practice quiz</H4>}
        {pathname === '/quiz-builder' && <H4>Quiz builder</H4>}

        <div className='flex flex-1 flex-row items-center justify-end gap-4'>
          <ThemeButton />
          {/*<Avatar>*/}
          {/*  <AvatarImage src='https://github.com/shadcn.png' />*/}
          {/*  <AvatarFallback>CN</AvatarFallback>*/}
          {/*</Avatar>*/}
        </div>
      </header>
    </>
  );
};

export default Header;
