import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
};

const H3 = ({ children, className }: Props) => {
  return (
    <>
      <h3 className={cn(`text-xl font-semibold tracking-tight`, className)}>{children}</h3>
    </>
  );
};

export default H3;
