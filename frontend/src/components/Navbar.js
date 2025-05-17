import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">🎓 ScholarMatch</Link>
      </div>

      <ul className="navbar__links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/all' ? 'active' : ''}>
          <Link to="/all">All Scholarships</Link>
        </li>
        <li className={location.pathname === '/profile' ? 'active' : ''}>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>

      <div className="navbar__auth">
        <Link to="/login" className="btn login">Login</Link>
        <Link to="/signup" className="btn signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
