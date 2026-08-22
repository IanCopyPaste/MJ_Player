import { useEffect, useState, useRef } from 'react';
import './css/Header.css';
import { Link, NavLink } from 'react-router';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const drawerRef = useRef(null);
  const scrollerRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!drawer || !scroller || !sheet) return;

    const visibleThreshold = 1 / window.innerWidth;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        if (entry.intersectionRatio < visibleThreshold) {
          drawer.hidePopover();
          setMenuOpen(false);
        }
        if (entry.intersectionRatio === 1) {
          setMenuOpen(true);
          sheet.focus();
        }
      },
      { root: drawer, threshold: [visibleThreshold, 1] }
    );
    observer.observe(sheet);

    if (!CSS.supports('animation-timeline: scroll()')) {
      const handleScroll = () => {
        const ratio = 1 - scroller.scrollLeft / sheet.offsetWidth;
        drawer.style.setProperty('--drawer-backdrop', ratio);
      };
      scroller.addEventListener('scroll', handleScroll);
      return () => {
        observer.disconnect();
        scroller.removeEventListener('scroll', handleScroll);
      };
    }

    return () => observer.disconnect();
  }, []);

  const openDrawer = async () => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    if (!drawer || !scroller) return;

    drawer.showPopover();
    
    if (!CSS.supports('scroll-initial-target', 'nearest')) {
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' });
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r))
      );
    }
    
    scroller.scrollTo({ left: 0, behavior: 'auto' });
  };

  const closeDrawer = () => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'auto' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeDrawer();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLightDismiss = (e) => {
    if (sheetRef.current && !sheetRef.current.contains(e.target)) {
      closeDrawer();
    }
  };

  const handleLinkClick = () => {
    closeDrawer();
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeDrawer}>
          <span className="logo-main">Michael Jackson</span>
          <span className="logo-sub">Player</span>
        </Link>

        {/* Navigation */}
        <nav className="navbar desktop-nav" aria-label="Main navigation" id="main-navigation">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/albums"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Albums
          </NavLink>

          <NavLink
            to="/awards"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Awards
          </NavLink>

          <NavLink
            to="/legacy"
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
          onClick={() => {
            if (menuOpen) closeDrawer();
            else openDrawer();
          }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

      </div>

      {/* Drawer */}
      <div id="drawer" popover="manual" className="Drawer" ref={drawerRef} onClick={handleLightDismiss}>
        <div className="Drawer-scroller" ref={scrollerRef}>
          <div className="Drawer-sheet" ref={sheetRef} tabIndex="-1">
            <nav className="drawer-nav">
              <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
              <NavLink to="/albums" onClick={handleLinkClick} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Albums</NavLink>
              <NavLink to="/awards" onClick={handleLinkClick} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Awards</NavLink>
              <NavLink to="/legacy" onClick={handleLinkClick} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Legacy</NavLink>
            </nav>
          </div>
          <div className="Drawer-spacer"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;