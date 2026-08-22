import { useEffect, useState } from 'react';
import './css/Header.css';
import { Link, NavLink } from 'react-router';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-main">Michael Jackson</span>
          <span className="logo-sub">Player</span>
        </Link>

        {/* Navigation */}
        <nav className="navbar" aria-label="Main navigation" id="main-navigation">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/albums"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Albums
          </NavLink>

          <NavLink
            to="/awards"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Awards
          </NavLink>

          <NavLink
            to="/legacy"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Legacy
          </NavLink>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

      </div>
    </header>
  );
}

export default Header;