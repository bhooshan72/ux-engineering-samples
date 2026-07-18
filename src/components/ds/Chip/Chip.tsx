// Vendored from my-design-system-react (src/components/Chip) — do not edit by
// hand. That package is `private` with no exports field and targets React 18,
// so it can't be installed as a dependency. Re-sync by re-copying the files.
import { Icon } from '../Icon/Icon';
import styles from './Chip.module.css';

export type ChipType = 'error' | 'warning' | 'good' | 'unknown' | 'regular' | 'primary';
export type ChipSize = 'md' | 'sm' | 'xm';

/** Material icon per chip type, matching the Figma chip icons. */
const ICON_NAME: Record<ChipType, string> = {
  error: 'do_not_disturb',
  warning: 'warning_amber',
  good: 'check_circle_outline',
  unknown: 'help_outline',
  regular: 'help_outline',
  primary: 'open_in_new',
};

/** Icon pixel size per chip size. */
const ICON_SIZE: Record<ChipSize, number> = { md: 16, sm: 12, xm: 10 };

export interface ChipProps {
  label?: string;
  type?: ChipType;
  size?: ChipSize;
  /** Show the leading icon */
  iconLeft?: boolean;
}

export const Chip = ({
  label = 'Chip',
  type = 'primary',
  size = 'md',
  iconLeft = true,
}: ChipProps) => (
  <span className={`${styles.chip} ${styles[type]} ${styles[size]}`}>
    {iconLeft && (
      <span className={styles.icon}>
        <Icon name={ICON_NAME[type]} variant="outlined" size={ICON_SIZE[size]} />
      </span>
    )}
    {label}
  </span>
);

export default Chip;
