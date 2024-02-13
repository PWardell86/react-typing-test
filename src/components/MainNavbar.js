import React, { useEffect } from "react";
import './MainNavbar.css';

function MainNavbar({ user }) {
  useEffect(() => {
    if (user) {
      document.getElementById('signin-section').style.display = 'none';
      document.getElementById('signed-in').style.display = 'block';
    } else {
      document.getElementById('signin-section').style.display = 'block';
      document.getElementById('signed-in').style.display = 'none';
    }
  }, [user]);

  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <h1 className="navbar-brand">Typing Test</h1>
        <p id="signed-in">Welcome, {user}</p>
        <div id="signin-section">
          <a href="/login" className="btn btn-text">Log In</a>
          <a href="/signup" className="btn btn-hollow">Sign Up</a>
        </div>
    </nav>
  );
}

export default MainNavbar;