export const RightButton = (color: string) => {
  return (
    <>
      <path d="M0 0H16L16 64H0V48L4 44V20L0 16V0Z" fill={color} />
      <rect width="145" height="64" transform="translate(16)" fill={color} />
      <path d="M161 0L177 15.7538V64H126V0Z" fill={color} />
    </>
  );
};
