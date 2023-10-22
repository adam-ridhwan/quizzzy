import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const ArrowLeft = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={cn('h-5 w-5 fill-primary-foreground', className)}
        viewBox='0 0 16 16'
      >
        <path
          fillRule='evenodd'
          d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
        />
      </svg>
    </>
  );
};

export default ArrowLeft;
