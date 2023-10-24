import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const CheckboxEmpty = ({ className }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 16 16'
        className={cn('h-3 w-3', className)}
      >
        <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
      </svg>
    </>
  );
};

export default CheckboxEmpty;
