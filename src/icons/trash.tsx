import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const Trash = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className={cn('h-5 w-5 fill-muted-foreground', className)}
      >
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z' />
      </svg>
    </>
  );
};
