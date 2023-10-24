import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const Plus = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={cn('h-4 w-4 fill-secondary-foreground', className)}
        viewBox='0 0 16 16'
      >
        <path
          fillRule='evenodd'
          d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
        />
      </svg>
    </>
  );
};
