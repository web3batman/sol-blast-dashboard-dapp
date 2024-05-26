import { CenterButton } from './CenterButton';
import { HamburgerButton } from './HamburgerButton';
import { LeftButton } from './LeftButton';
import { RightButton } from './RightButton';
import { StrangeButton } from './StrangeButton';

export const Icons = {
  LeftButton,
  CenterButton,
  StrangeButton,
  RightButton,
  HamburgerButton,
} as const;

export type IconNames = keyof typeof Icons;
