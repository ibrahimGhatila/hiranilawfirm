import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi'

import data from '../../data/site.json'
import images from '../../assets/images.js'

const { nav } = data

export default function Header() {
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null)
  const location = useLocation()

  // Close the mobile sidebar on route change.
  useEffect(() => {
    setOpen(false)
    setOpenSub(null)
  }, [location.pathname])

  // Lock body scroll while the sidebar is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="hl-navbar">
      <div className="hl-container d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand p-0 m-0">
          <img src={images.logo} alt="Hirani Law Firm" />
        </Link>

        {/* Desktop nav — pushed to the right */}
        <nav className="d-none d-lg-flex align-items-center gap-1 ms-auto">
          {nav.links.map((link) => (
            <div key={link.label} className="hl-dropdown">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  'hl-nav-link' + (isActive ? ' active' : '')
                }
              >
                {link.label}
                {link.children && <FiChevronDown size={14} />}
              </NavLink>
              {link.children && (
                <div className="hl-dropdown-menu">
                  {link.children.map((child) => (
                    <Link key={child.label} to={child.to}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="hl-burger d-lg-none ms-auto"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile sidebar (max 80% width) */}
      <div
        className={'hl-sidebar-overlay' + (open ? ' open' : '')}
        onClick={() => setOpen(false)}
      />
      <aside className={'hl-sidebar' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="hl-sidebar-head">
          <img src={images.logo} alt="Hirani Law Firm" />
          <button
            className="hl-sidebar-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <nav>
          {nav.links.map((link) => (
            <div key={link.label}>
              {link.children ? (
                <>
                  <button
                    type="button"
                    className="hl-sidebar-link w-100 text-start bg-transparent border-0 d-flex justify-content-between align-items-center"
                    onClick={() =>
                      setOpenSub(openSub === link.label ? null : link.label)
                    }
                  >
                    {link.label}
                    <FiChevronDown
                      size={16}
                      style={{
                        transition: 'transform 0.2s',
                        transform:
                          openSub === link.label ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  </button>
                  {openSub === link.label && (
                    <div className="hl-sidebar-sub">
                      {link.children.map((child) => (
                        <Link key={child.label} to={child.to}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={link.to} className="hl-sidebar-link">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </header>
  )
}
