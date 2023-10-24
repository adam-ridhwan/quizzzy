import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
};

const H1 = ({ children, className }: Props) => {
  return (
    <>
      <h1 className={cn('text-4xl font-bold tracking-tight', className)}>{children}</h1>
    </>
  );
};

export default H1;
