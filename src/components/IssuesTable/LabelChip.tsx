import type { CSSProperties } from 'react'
import type { Label } from './types.ts'
import { readableTextColor } from './utils.ts'

interface LabelChipProps {
  label: Label
}

// A pill tinted with the label's own color. The name text is always present —
// color is never the only signal — and the text color is chosen for contrast.
function LabelChip({ label }: LabelChipProps) {
  const background = `#${label.color}`
  const style = {
    '--chip-bg': background,
    '--chip-fg': readableTextColor(label.color),
  } as CSSProperties

  return (
    <li className="label-chip" style={style}>
      {label.name}
    </li>
  )
}

export default LabelChip
