export const MobileSVGButton = ({
  width,
  height,
  viewBox,
  color,
}: {
  width: number;
  height: number;
  viewBox: string;
  color: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M4 4l4 -4H${width - 8}l4 4V${height / 4}l4 4V${(height / 4) * 3 - 4}l-4 4V${height - 4}l-4 4H8l-4 -4V${(height / 4) * 3}l-4 -4V${height / 4 + 4}l4 -4`}
        fill={color}
      />
    </svg>
  );
};
