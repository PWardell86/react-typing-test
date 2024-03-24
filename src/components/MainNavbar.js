import React, { useEffect } from "react";
import './MainNavbar.css';
import LoginModal from './LoginModal';
import SignupModal from "./SignupModal";
import UserDropdown from './UserDropdown';

function MainNavbar({ user }) {

  useEffect(() => {
    const signinSection = document.getElementById('signin-section');
    const userSection = document.getElementById('user-section');
    if (user) {
      signinSection.setAttribute('hidden', true);
      userSection.removeAttribute('hidden');
    } else {
      signinSection.removeAttribute('hidden');
      userSection.setAttribute('hidden', true);
    }
  }, [user]);

  return (
    <nav className="navbar">
      <div id="title-section">
        <h2>Typing Test</h2>
        <p id="last-updated">Updated: March 11, 2024</p>
      </div>
      <div id="user-section">
        <p id="signed-in">Welcome, {user && user.display_name}</p>
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