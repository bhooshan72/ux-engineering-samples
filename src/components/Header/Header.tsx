import './Header.scss'

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="/">
          UX&nbsp;Eng&nbsp;Sample
        </a>
        <nav className="header__nav" aria-label="Primary">
          <a className="header__link" href="/">
            Home
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
