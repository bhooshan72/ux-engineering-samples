import { useCallback, useEffect, useState } from 'react'
import type { Issue, IssuesState } from './types.ts'
import LoadingSkeleton from './LoadingSkeleton.tsx'
import ErrorPanel from './ErrorPanel.tsx'
import EmptyState from './EmptyState.tsx'
import IssuesTableView from './IssuesTableView.tsx'
import './IssuesTable.scss'

const ISSUES_URL =
  'https://api.github.com/repos/facebook/react/issues?state=open&per_page=20'

function IssuesTable() {
  const [state, setState] = useState<IssuesState>({ status: 'loading' })
  // Bumping this re-runs the fetch effect — that's how Retry re-fires.
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    // Abort on unmount / re-run so React 19 StrictMode's double-mount doesn't
    // leave a stray request that set-states after the component is gone.
    const controller = new AbortController()

    async function load() {
      setState({ status: 'loading' })
      try {
        const res = await fetch(ISSUES_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        })

        // A rate-limited (403) or not-found (404) response still resolves the
        // promise, so guard on res.ok rather than trusting the catch.
        if (!res.ok) {
          throw new Error(`GitHub API responded ${res.status} ${res.statusText}`)
        }

        const issues = (await res.json()) as Issue[]
        setState({ status: 'success', issues })
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setState({ status: 'error', error: message })
      }
    }

    load()
    return () => controller.abort()
  }, [reloadKey])

  function renderView() {
    switch (state.status) {
      case 'loading':
        return <LoadingSkeleton />
      case 'error':
        return <ErrorPanel message={state.error} onRetry={retry} />
      case 'success':
        return state.issues.length === 0 ? (
          <EmptyState />
        ) : (
          <IssuesTableView issues={state.issues} />
        )
    }
  }

  return (
    <div className="issues-region" aria-busy={state.status === 'loading'}>
      {/*
        Persistent, visually-hidden live region. It holds a concise summary of
        the current state — not the table itself — so transitions announce
        "Loaded 20 open issues" rather than reading every row aloud. It must
        stay mounted across states for the polite announcement to fire.
      */}
      <p className="sr-only" aria-live="polite">
        {getStatusMessage(state)}
      </p>
      {renderView()}
    </div>
  )
}

function getStatusMessage(state: IssuesState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading issues…'
    case 'error':
      return `Error loading issues: ${state.error}`
    case 'success':
      return state.issues.length === 0
        ? 'No open issues found.'
        : `Loaded ${state.issues.length} open issues.`
  }
}

export default IssuesTable
