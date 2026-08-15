import { useEffect, useState } from 'react';
import './css/Header.css';
import { Link, NavLink } from 'react-router';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-main">Michael Jackson</span>
          <span className="logo-sub">Player</span>
        </Link>

        {/* Navigation */}
        <nav className="navbar">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/music"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Music
          </NavLink>

          <NavLink
            to="/albums"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Albums
          </NavLink>

          <NavLink
            to="/videos"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Videos
          </NavLink>

          <NavLink
            to="/legacy"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Legacy
          </NavLink>
        </nav>

        {/* Right side button */}
        <button className="listen-button">
          Listen Now
        </button>

      </div>
    </header>
  );
}

export default Header;