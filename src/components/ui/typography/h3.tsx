type Props = {
  children: string;
};

const H3 = ({ children }: Props) => {
  return (
    <>
      <h3 className='text-xl font-semibold tracking-tight'>{children}</h3>
    </>
  );
};

export default H3;
