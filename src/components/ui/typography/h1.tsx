type Props = {
  children: string;
};

const H1 = ({ children }: Props) => {
  return (
    <>
      <h1 className='text-4xl font-bold tracking-tight'>{children}</h1>
    </>
  );
};

export default H1;
