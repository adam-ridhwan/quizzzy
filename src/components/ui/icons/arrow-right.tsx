import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const ArrowRight = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={cn('h-5 w-5 fill-primary-foreground', className)}
        viewBox='0 0 16 16'
      >
        <path
          fillRule='evenodd'
          d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
        />
      </svg>
    </>
  );
};

export default ArrowRight;
