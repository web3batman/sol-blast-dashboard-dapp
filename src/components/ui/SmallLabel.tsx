interface LabelProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SmallLabel = ({ children, onClick }: LabelProps) => {
  return (
    <button
      className="flex w-full min-w-[50px] items-center justify-center rounded-[5px] border-[1px] border-[#FFFDBF] bg-[#363406] px-4 py-5 text-white hover:bg-[#706d2f]"
      onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default SmallLabel;
