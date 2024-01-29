import React from "react";
import './MainNavbar.css';

function MainNavbar({ googleLogin, googleLogout, profileImage, username, isLoggedIn }) {
  const loggedOut = (
    <div id="login-items" className="login-section">
      <button className="btn-snd btn" onClick={googleLogin}>Log In</button>
    </div>
  );

  const loggedIn = (
    <div id="logged-in-items" className="logged-in">
      <img className="avatar" src={profileImage} alt="Avatar" />
      <div className="username">{username}</div>
      <button className="btn-snd btn" onClick={googleLogout}>Log Out</button>
    </div>
  );
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <h1 className="navbar-brand">Typing Test</h1>
      {!isLoggedIn ? loggedOut : null}
      {isLoggedIn ? loggedIn : null}
    </nav>
  );
}

export default MainNavbar;