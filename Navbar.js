import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("userEmail") || localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      setUser(localStorage.getItem("userEmail"));
    };

    // Listen for login/logout changes
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    window.dispatchEvent(new Event("storage")); // Manually trigger update
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/Header/logo1.jpg" alt="Club Logo" className="logo" />
      </div>
      <nav className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contests">Theme Contest</Link></li>
          <li><Link to="/club_info">Club Info</Link></li>
         
          {user ? (
  <li className="profile-dropdown">
    <FaUserCircle className="user-icon" size={28} />
    <ul className="dropdown-menu">
      <li><button onClick={handleLogout}>Logout</button></li>
    </ul>
  </li>
) : (
  <li><Link to="/login">Login</Link></li>
)}
        </ul>
      </nav>
    </header>
  );
};



export default Navbar;
