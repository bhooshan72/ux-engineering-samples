import type { ChipType } from '../ds/Chip/Chip.tsx'

// GitHub labels are free-form: arbitrary names, arbitrary hex colors. The design
// system's Chip offers six fixed semantic types. This maps one onto the other by
// matching the label *name*, since the API colour has no counterpart in the
// design system and is deliberately discarded.
//
// Rules are ordered and the first match wins, so put the more specific patterns
// first — "needs more information" must beat the bare "info" case, and
// "good first issue" must not be captured by a generic "good" rule.
const RULES: { pattern: RegExp; type: ChipType }[] = [
  { pattern: /\b(bug|defect|crash|regression|broken|error|fail)/i, type: 'error' },
  { pattern: /\b(needs? (more )?info|needs? repro|blocked|stale|waiting)/i, type: 'warning' },
  { pattern: /\b(good first issue|help wanted|contributions welcome)/i, type: 'good' },
  { pattern: /\b(resolved|fixed|shipped|done|approved)/i, type: 'good' },
  { pattern: /\b(doc|documentation|feature|enhancement|proposal|rfc)/i, type: 'primary' },
  { pattern: /\b(unconfirmed|unverified|question|discussion|investigat)/i, type: 'unknown' },
]

// Anything unmatched stays neutral rather than being forced into a bucket that
// would imply a status GitHub never asserted.
export function labelToChipType(name: string): ChipType {
  return RULES.find((rule) => rule.pattern.test(name))?.type ?? 'regular'
}
