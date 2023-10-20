import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const ArrowCircle = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className={cn('h-5 w-5 fill-secondary-foreground', className)}
      >
        <path d='M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z'></path>
      </svg>
    </>
  );
};

export default ArrowCircle;
