import type { Label } from './types.ts'
import { labelToChipType } from './labelType.ts'
import { Chip } from '../ds/Chip/Chip.tsx'

interface LabelChipProps {
  label: Label
}

// Thin adapter: the design system's Chip is a <span> with six semantic types,
// while the Labels cell is a <ul>. The <li> keeps the list semantics; the Chip
// supplies the visuals. GitHub's per-label colour is intentionally dropped —
// see labelType.ts.
//
// The leading icon is suppressed here: it is keyed to the chip *type*, not the
// label, so it repeats down the column without adding information — and the
// `regular` and `primary` glyphs actively mislead (a "?" on a plain version tag,
// an "open in new" arrow on a chip that isn't a link).
function LabelChip({ label }: LabelChipProps) {
  return (
    <li className="label-chip">
      <Chip
        label={label.name}
        type={labelToChipType(label.name)}
        size="sm"
        iconLeft={false}
      />
    </li>
  )
}

export default LabelChip
