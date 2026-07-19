// Minimal shape of the GitHub REST API issue objects — only the fields this
// component actually reads. See:
// https://docs.github.com/en/rest/issues/issues#list-repository-issues

export interface User {
  login: string
}

export interface Label {
  name: string
  color: string
}

export interface Issue {
  number: number
  title: string
  user: User
  labels: Label[]
  comments: number
  created_at: string
}

// The three explicit UI states, as a discriminated union on `status`.
export type IssuesState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; issues: Issue[] }
