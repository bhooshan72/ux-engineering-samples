import TableHead, { COLUMNS } from './TableHead.tsx'

const ROW_COUNT = 8

// Placeholder table that mirrors the real column layout so the page doesn't
// jump when data arrives. Purely decorative and aria-hidden — the loading state
// is announced by the live region in the container, not by this markup.
function LoadingSkeleton() {
  return (
    <table className="issues-table issues-table--skeleton" aria-hidden="true">
      <TableHead />
      <tbody>
        {Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {COLUMNS.map((column) => (
              <td key={column.key} className={column.className}>
                <span className="skeleton-bar" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LoadingSkeleton
