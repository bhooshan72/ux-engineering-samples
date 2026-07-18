// Format an ISO timestamp as a short relative string, e.g. "3 days ago".
const RELATIVE_FORMAT = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'seconds' },
  { amount: 60, unit: 'minutes' },
  { amount: 24, unit: 'hours' },
  { amount: 7, unit: 'days' },
  { amount: 4.34524, unit: 'weeks' },
  { amount: 12, unit: 'months' },
  { amount: Number.POSITIVE_INFINITY, unit: 'years' },
]

export function relativeTime(iso: string): string {
  let duration = (new Date(iso).getTime() - Date.now()) / 1000
  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_FORMAT.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }
  return ''
}

// Full, human-readable timestamp for the `title`/tooltip on the relative date.
const ABSOLUTE_FORMAT = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function absoluteTime(iso: string): string {
  return ABSOLUTE_FORMAT.format(new Date(iso))
}

// Pick black or white text for a given hex background so a label chip stays
// legible whatever color GitHub assigned it. Based on WCAG relative luminance.
export function readableTextColor(hex: string): string {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return '#000000'

  const channels = [0, 2, 4].map((i) => {
    const value = parseInt(clean.slice(i, i + 2), 16) / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  const luminance =
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]

  return luminance > 0.179 ? '#000000' : '#ffffff'
}
