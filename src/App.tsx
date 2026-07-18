import Header from './components/Header/Header.tsx'
import IssuesTable from './components/IssuesTable/IssuesTable.tsx'
import './App.scss'

function App() {
  return (
    <div className="app-shell">
      <a className="app-shell__skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" className="app-shell__main">
        <h1>UX Engineering Sample</h1>
        <p>
          Minimal app shell. Build components by hand in{' '}
          <code>src/components</code>, style with SCSS using the design tokens in{' '}
          <code>src/styles/tokens.scss</code>.
        </p>
        <IssuesTable />
      </main>
    </div>
  )
}

export default App
