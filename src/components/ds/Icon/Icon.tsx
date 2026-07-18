import type { CSSProperties } from 'react';
import 'material-icons/iconfont/material-icons.css';

/** The five Material Icons themes, matching the Figma "Style" variants. */
export type IconStyle = 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';

const STYLE_CLASS: Record<IconStyle, string> = {
  filled: 'material-icons',
  outlined: 'material-icons-outlined',
  round: 'material-icons-round',
  sharp: 'material-icons-sharp',
  'two-tone': 'material-icons-two-tone',
};

export interface IconProps {
  /** Material icon ligature name, e.g. "check_circle_outline", "settings" */
  name: string;
  /** Theme — maps to Figma's Style variant (default: outlined) */
  variant?: IconStyle;
  /** Pixel size (default 24) */
  size?: number;
  /** Icon color (defaults to currentColor so it inherits text color) */
  color?: string;
  /** Accessible label; when omitted the icon is hidden from assistive tech */
  label?: string;
  className?: string;
}

export const Icon = ({
  name,
  variant = 'outlined',
  size = 24,
  color,
  label,
  className,
}: IconProps) => {
  const style: CSSProperties = { fontSize: size, lineHeight: 1, color };
  return (
    <span
      className={`${STYLE_CLASS[variant]}${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      translate="no"
    >
      {name}
    </span>
  );
};

export default Icon;
