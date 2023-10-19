'use client';

import useQuiz from '@/hooks/use-quiz';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SideMenuMobile from '@/components/side-menu/side-menu-mobile';
import ThemeButton from '@/components/theme-button';

const Header = () => {
  const { quizzes, currentQuizIndex } = useQuiz();
  return (
    <>
      <header className='flex h-14 flex-row items-center'>
        <div className='flex flex-1 items-center gap-2'>
          {/*<SideMenuMobile />*/}
          <span className='hidden font-bold md:flex'>Quizzzy</span>
        </div>

        {currentQuizIndex < quizzes.length && (
          <span className='hidden flex-1 justify-center md:flex'>
            {currentQuizIndex}/{quizzes.length}
          </span>
        )}

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
