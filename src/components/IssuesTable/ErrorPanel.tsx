interface ErrorPanelProps {
  message: string
  onRetry: () => void
}

// The error is announced by the container's polite live region, so this panel
// carries no live-region role of its own (a nested role="alert" would announce
// the same message a second time, assertively). The icon is decorative
// (aria-hidden); the message text carries the meaning.
function ErrorPanel({ message, onRetry }: ErrorPanelProps) {
  return (
    <div className="error-panel">
      <svg
        className="error-panel__icon"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v7h-2V7Zm0 9h2v2h-2v-2Z"
        />
      </svg>
      <div className="error-panel__body">
        <p className="error-panel__title">Couldn’t load issues</p>
        <p className="error-panel__message">{message}</p>
      </div>
      <button type="button" className="error-panel__retry" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}

export default ErrorPanel
