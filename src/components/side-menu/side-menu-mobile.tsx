import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import H1 from '@/components/ui/typography/h1';
import H2 from '@/components/ui/typography/h2';

const SideMenuMobile = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-7 w-7'
            >
              <path
                fillRule='evenodd'
                d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                clipRule='evenodd'
              />
            </svg>
          </Button>
        </SheetTrigger>

        <SheetPortal>
          <SheetContent side='left' className='pt-16'>
            <H2 className='mb-8'>Quizzy</H2>

            <H1>This is a question?</H1>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    </>
  );
};

export default SideMenuMobile;
