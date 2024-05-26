export const BridgeButton = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d={`M14 0H${width}V${height - 14}l-14 14H0V14`} fill="#FFFDBF" />
    </svg>
  );
};
