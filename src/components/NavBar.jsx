import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useState, useContext } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // <-- import context

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // <-- get user and logout from context
  const nav = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    nav("/login");
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="logo">💚</div>
          <div className="brand-text">MentalCare</div>
        </Link>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>
          <Link to="/testimonials" onClick={closeMenu}>
            Testimonials
          </Link>

          {user ? (
            <div className="profile-menu">
              <div
                className="profile-icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle size={22} /> {user.name}
              </div>
              {dropdownOpen && (
                <div className="dropdown">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      nav("/settings"); // programmatic navigation
                    }}
                  >
                    Settings
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn" onClick={closeMenu}>
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
