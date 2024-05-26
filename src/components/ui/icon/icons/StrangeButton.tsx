export const StrangeButton = (color: string) => {
  return (
    <>
      <path d="M0 0H16L16 64H0V48L4 44V20L0 16V0Z" fill={color} />
      <rect width="110" height="64" transform="translate(16)" fill={color} />
      <path d="M142 0H126L126 64H142V48L146 44V20L142 16V0Z" fill={color} />
    </>
  );
};
