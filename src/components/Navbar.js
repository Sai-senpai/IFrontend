import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
let navigate = useNavigate();
  const location = useLocation();
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar">
      <div className={`nav-links ${isNavOpen ? "nav-active" : ""}`}>
        <Link
          to="/"
          onClick={handleNavToggle}
          className={`${location.pathname === "/" ? "active" : ""}`}
        >
          SaiNoteBook
        </Link>
        <Link
          to="/about"
          onClick={handleNavToggle}
          className={`${location.pathname === "/about" ? "active" : ""}`}
        >
          About
        </Link>
        <Link
          to="/services"
          onClick={handleNavToggle}
          className={`${location.pathname === "/services" ? "active" : ""}`}
        >
          Services
        </Link>
        
      </div>
      <div className="search-bar">
      {
        !localStorage.getItem('token')?
    (
      <div>
      
      <Link
      to="/login"
      onClick={handleNavToggle}
      className={`${location.pathname === "/login" ? "active" : ""}`}
      >
      <button type="button" className="btn btn-primary mx-1">
        Login
        </button>
        </Link>

        <Link
        to="/signup"
        onClick={handleNavToggle}
        className={`${location.pathname === "/signup" ? "active" : ""}`}
        >
        <button type="button" className="btn btn-primary mx-1">
          SignUp
          </button>
          </Link>
          </div>
    )
  :
  <button onClick={()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }} type="button" className="btn btn-primary mx-1">
  Logout
  </button>
}
      
      </div>
      <div
        className={`burger ${isNavOpen ? "toggle" : ""}`}
        onClick={handleNavToggle}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
