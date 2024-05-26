interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SmallButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="flex w-max min-w-[50px] items-center justify-center rounded-bl-sm rounded-tr-sm bg-lightyellow px-4 py-1 text-black"
      style={{
        clipPath: 'polygon(0 50%, 30% 0, 100% 0, 100% 50%, 70% 100%, 0 100%)',
      }}
      onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default SmallButton;
