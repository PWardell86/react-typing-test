import React from 'react';
import './Form.css';
import axios from 'axios';

function LoginPage({ backend }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const staySignedIn = document.getElementById('staySignedInCheck').checked;

    axios.post(backend + '/login', {
      username: username,
      password: password,
      staySignedIn: staySignedIn
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <a className="back-btn" href="/">Home</a>
      <div className="centered">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type='text' className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="staySignedInCheck" />
            <label className="form-check-label" htmlFor="staySignedInCheck">Keep me signed in</label>
          </div>
          <button id="submit-button " type="submit" className="btn btn-primary">Submit</button>
          <a id="signup-btn" href="/signup">Sign up</a>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;