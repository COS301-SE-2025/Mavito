import { useMemo, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import '../../styles/Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const navItems = useMemo(
    () => ['Dashboard', 'Search', 'Saved Terms', 'Analytics'],
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('theme-dark');
      root.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    }

    const currentPath = location.pathname.replace('/', '').replace(/-/g, ' ');
    const match = navItems.find(
      (item) => item.toLowerCase() === currentPath.toLowerCase(),
    );
    if (match) setActive(match);
    else setActive('');
  }, [darkMode, location.pathname, navItems]);

  return (
    <nav className="w-full fixed top-0 left-0 bg-theme text-theme px-6 py-3 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/DFSI_Logo.png"
            alt="Mavito Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-xl font-semibold">Mavito</span>
        </div>

        {/* Nav Links (desktop) */}
        <div className="hidden md:flex space-x-8 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
              className={`relative pb-1 ${
                active === item
                  ? 'font-medium text-white'
                  : 'text-white/70 hover:text-white visited:text-white/70'
              }`}
              onClick={() => {
                setActive(item);
              }}
            >
              {item}
              {active === item && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] rounded bg-[#F00A50] drop-shadow-[0_0_6px_#F00A50]" />
              )}
            </NavLink>
          ))}
        </div>

        {/* Avatar, Theme Toggle & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className="text-theme bg-theme hover:text-accent-pink transition outline-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none"
            type="button"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <button
            className="md:hidden text-theme bg-theme hover:text-accent-pink transition"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          px-6 bg-theme shadow-md
          ${menuOpen ? 'max-h-64 opacity-100 pt-3 pb-2' : 'max-h-0 opacity-0 pt-0 pb-0'}
        `}
      >
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
            className={`block ${
              active === item ? 'text-theme font-semibold' : 'text-gray-300'
            }`}
            onClick={() => {
              setActive(item);
              setMenuOpen(false);
            }}
          >
            {item}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
