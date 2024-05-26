export const HamburgerButton = (color: string) => {
  return (
    <>
      <path
        d="M4 0H46V16L50 20V44L46 48V64H4V48L0 44V20L4 16V0Z"
        fill={color}
      />
    </>
  );
};
