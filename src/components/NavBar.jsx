import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <div className="logo">💚</div>
          <div className="brand-text">MentalCare</div>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/signup" className="btn">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}
