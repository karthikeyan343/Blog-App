import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
        <header className="site-header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to={"/"} onClick={closeMenu}>
              My Blog
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              aria-controls="navbarNav"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to={"/"} onClick={closeMenu}>
              Home
            </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/posts'} onClick={closeMenu}>
                    Posts
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/about'} onClick={closeMenu}>
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/contact'} onClick={closeMenu}>
                    Contact
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/admin/posts'} onClick={closeMenu}>
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
  )
}

export default Header
