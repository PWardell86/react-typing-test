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
    <nav className="navbar">
      <div id="title-section">
        <h2>Typing Test</h2>
        <p id="last-updated">Updated: March 11, 2024</p>
      </div>
      <div id="user-section">
        <p id="signed-in">Welcome, {user}</p>
        <UserDropdown />
      </div>

      <div id="signin-section">
        <LoginModal />
        <SignupModal />
      </div>
    </nav>
  );
}

export default MainNavbar;