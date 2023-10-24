import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const ThreeDotsVertical = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={cn('h-6 w-6 fill-muted-foreground', className)}
        viewBox='0 0 16 16'
      >
        <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
      </svg>
    </>
  );
};
