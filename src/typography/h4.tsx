type Props = {
  children: string;
};

const H4 = ({ children }: Props) => {
  return (
    <>
      <h4 className='text-sm font-semibold'>{children}</h4>
    </>
  );
};

export default H4;
