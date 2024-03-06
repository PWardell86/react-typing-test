import React, { useEffect } from "react";
import './MainNavbar.css';
import LoginModal from './LoginModal';
import SignupModal from "./SignupModal";
import UserDropdown from './UserDropdown';
function MainNavbar({ user }) {

  useEffect(() => {
    if (user) {
      document.getElementById('signin-section').style.display = 'none';
      document.getElementById('user-section').style.display = 'flex';
    } else {
      document.getElementById('signin-section').style.display = 'flex';
      document.getElementById('user-section').style.display = 'none';
    }
  }, [user]);

  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <div id="title-section">
        <h2>Typing Test</h2>
        <p id="last-updated">Updated: Feb 4, 2024</p>
      </div>
      <div id="user-section">
        <p id="signed-in">Welcome, {user}</p>
        <UserDropdown />
        {/* <img id="logout-btn" className="btn btn-hollow"src="log-out.svg" aria-labelledby="logout" onClick={logout} /> */}
      </div>

      <div id="signin-section">
        <LoginModal />
        <SignupModal />
      </div>
    </nav>
  );
}

export default MainNavbar;