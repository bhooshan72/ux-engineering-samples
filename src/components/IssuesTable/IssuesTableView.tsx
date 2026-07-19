import type { Issue } from './types.ts'
import TableHead from './TableHead.tsx'
import LabelChip from './LabelChip.tsx'
import { absoluteTime, relativeTime } from './utils.ts'

interface IssuesTableViewProps {
  issues: Issue[]
}

const REPO_URL = 'https://github.com/facebook/react'

function IssuesTableView({ issues }: IssuesTableViewProps) {
  return (
    <table className="issues-table">
      <caption className="sr-only">
        Open issues in facebook/react, showing the {issues.length} most recent.
      </caption>
      <TableHead />
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.number}>
            <td className="issues-table__col--num">
              <a
                href={`${REPO_URL}/issues/${issue.number}`}
                target="_blank"
                rel="noreferrer"
              >
                #{issue.number}
              </a>
            </td>
            <td className="issues-table__col--title">{issue.title}</td>
            <td className="issues-table__col--author">{issue.user.login}</td>
            <td className="issues-table__col--labels">
              {issue.labels.length > 0 ? (
                <ul className="label-chips">
                  {issue.labels.map((label) => (
                    <LabelChip key={label.name} label={label} />
                  ))}
                </ul>
              ) : (
                <span className="issues-table__muted">—</span>
              )}
            </td>
            <td className="issues-table__col--comments">
              {issue.comments}
              <span className="sr-only"> comments</span>
            </td>
            <td className="issues-table__col--created">
              <time dateTime={issue.created_at} title={absoluteTime(issue.created_at)}>
                {relativeTime(issue.created_at)}
              </time>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IssuesTableView
