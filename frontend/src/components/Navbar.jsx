import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <h1>Get Things Done!</h1>
        </Link>

        <nav>
          {user ? (
            <div className="nav-links">
              <span className="nav-user">{user.email}</span>
              <button onClick={logout} className="nav-button">
                Log out
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/login" className="nav-button">
                Login
              </Link>
              <Link to="/signup" className="nav-button">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
