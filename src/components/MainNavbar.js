import React, { useEffect } from "react";
import './MainNavbar.css';
import LoginModal from './LoginModal';
import SignupModal from "./SignupModal";
import UserDropdown from './UserDropdown';

import { Link } from 'react-router-dom';
function MainNavbar({ user, active }) {

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

  const getLinkClasses = (linkName) => {
    return "nav-link btn-text" + ((active === linkName) ? " active" : "");
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h2>Typing Test</h2>
        <span className="divider" ></span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={getLinkClasses('home')} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={getLinkClasses('leaderboards')} to="/leaderboards">Leaderboards</Link>
            </li>
          </ul>
        </div>
        <div id="user-section">
          <p id="signed-in">Welcome, {user && user.display_name}</p>
          <UserDropdown />
        </div>
        <div id="signin-section">
          <LoginModal />
          <SignupModal />
        </div>
      </div>


    </nav>
  );
}

export default MainNavbar;