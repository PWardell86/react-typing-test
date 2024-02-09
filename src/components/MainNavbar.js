import React from "react";
import './MainNavbar.css';

function MainNavbar() {
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <h1 className="navbar-brand">Typing Test</h1>
      <div is="sign-in-section">
        <a href="/login" className="btn btn-text">Log In</a>
        <a href="/signup" className="btn btn-hollow">Sign Up</a>
      </div>
    </nav>
  );
}

export default MainNavbar;