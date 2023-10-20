'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CheckboxGrid from '@/components/ui/icons/checkbox-grid';
import H4 from '@/components/ui/typography/h4';
import ThemeButton from '@/components/theme-button';

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <header className='flex h-14 flex-row items-center'>
        <div className='flex flex-1 items-center gap-2'>
          <CheckboxGrid />
          <Link href='/' className='text-lg font-bold'>
            Quizzzy
          </Link>
        </div>

        {pathname === '/demo' && <H4>Practice quiz</H4>}

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
