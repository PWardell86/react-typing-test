import React, { useEffect, useContext } from "react";
import './Navbar.css';
import LoginModal from '../TypingTest/LoginModal';
import SignupModal from "../TypingTest/SignupModal";
import UserDropdown from '../TypingTest/UserDropdown';
import UserContext from "../../UserContext";

function Navbar({ active }) {
  const user = useContext(UserContext);
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
              <a className={getLinkClasses('home')} href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className={getLinkClasses('leaderboards')} href="/leaderboards">Leaderboards</a>
            </li>
            <li className="nav-item">
              <a className={getLinkClasses('multiplayer')} href="/multiplayer">Multiplayer</a>
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

export default Navbar;