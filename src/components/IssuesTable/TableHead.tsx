// Single source of truth for the column layout. Both the loading skeleton and
// the success table render this same <thead>, so their columns stay aligned.

export interface Column {
  key: string
  label: string
  className: string
}

export const COLUMNS: Column[] = [
  { key: 'number', label: '#', className: 'issues-table__col--num' },
  { key: 'title', label: 'Title', className: 'issues-table__col--title' },
  { key: 'author', label: 'Author', className: 'issues-table__col--author' },
  { key: 'labels', label: 'Labels', className: 'issues-table__col--labels' },
  {
    key: 'comments',
    label: 'Comments',
    className: 'issues-table__col--comments',
  },
  { key: 'created', label: 'Opened', className: 'issues-table__col--created' },
]

function TableHead() {
  return (
    <thead>
      <tr>
        {COLUMNS.map((column) => (
          <th key={column.key} scope="col" className={column.className}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
