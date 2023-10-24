import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
};

const H2 = ({ children, className }: Props) => {
  return (
    <>
      <h2 className={cn('text-2xl font-semibold tracking-tight', className)}>{children}</h2>
    </>
  );
};

export default H2;
