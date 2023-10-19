import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const ErrorCircle = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className={cn('h-5 w-5 fill-red-500', className)}
      >
        <path d='M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z'></path>
      </svg>
    </>
  );
};

export default ErrorCircle;
