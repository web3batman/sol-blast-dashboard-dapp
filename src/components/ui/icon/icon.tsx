import { IconNames, Icons } from './icons';

export const Icon = ({
  width,
  height,
  viewBox,
  color = '#FFF',
  name,
}: {
  width?: number;
  height?: number;
  viewBox?: string;
  color?: string;
  name?: IconNames;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {Icons[name!](color)}
    </svg>
  );
};
