export const CenterButton = (color: string) => {
  return (
    <>
      <path d="M4 0H20L20 64H4V48L0 44V20L4 16V0Z" fill={color} />
      <rect width="194" height="64" transform="translate(20)" fill={color} />
      <path d="M230 0H214L214 64H230V48L234 44V20L230 16V0Z" fill={color} />
    </>
  );
};
