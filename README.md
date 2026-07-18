# UX Engineering Work Samples

Hand-built React + TypeScript + SCSS components demonstrating
design-to-code work: typed API consumption, explicit loading /
error / empty states, and WCAG-conscious interaction details.

Built by [Bhooshan Kulkarni](https://www.linkedin.com/in/bhooshan-kulkarni) —
UX engineer with 15+ years in product design and 3 years building
UI in code, most recently as founding designer at a security
startup where I shipped front-end through PRs and code reviews.
My workflow is AI-assisted (Claude Code, Cursor): I direct, review,
and edit every line, and each component ships through a branch +
pull request with a self-review pass. See the merged PRs for
decisions and tradeoffs.

## Components

**IssuesTable** *(in progress)* — fetches live open issues from the
GitHub REST API. Typed response models, a discriminated-union state
machine (loading / error / success), skeleton rows instead of
spinners, inline error with retry, and an accessible empty state.
Accessibility: semantic table markup, `aria-live` announcements,
visible focus rings, `prefers-reduced-motion` support.

*(Planned: form validation with accessible inline errors; component
tests with React Testing Library.)*

## Running locally

npm install
npm run dev

## Why this repo exists

Proprietary work stays with employers. This repo recreates the
shape of that work — the same patterns, states, and review
discipline — in code I can walk through live.