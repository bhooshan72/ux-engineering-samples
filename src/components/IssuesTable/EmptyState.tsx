const REPO_URL = 'https://github.com/facebook/react'

// Shown when the fetch succeeds but returns zero issues. Explains the state and
// points somewhere useful rather than leaving a blank table.
function EmptyState() {
  return (
    <div className="empty-state">
      <p className="empty-state__title">No open issues</p>
      <p className="empty-state__body">
        There are currently no open issues to show. This is unusual for an active
        repository — the query may have filtered everything out, or issues may be
        disabled.
      </p>
      <a
        className="empty-state__link"
        href={`${REPO_URL}/issues`}
        target="_blank"
        rel="noreferrer"
      >
        View issues on GitHub →
      </a>
    </div>
  )
}

export default EmptyState
