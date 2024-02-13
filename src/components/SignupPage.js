import React from 'react';
import './Form.css';
import axios from 'axios';

function SignupPage({ backend }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }

    axios.post(backend + '/createuser', {
      username: username,
      password: password
    })
      .then((response) => {
        window.location.href = '/login';
      }).catch((error) => {
        console.log(error);
      });

  };

  return (
    <div>
      <a className="back-btn" href="/">Home</a>
      <div className="centered">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="passwordConfirm" placeholder="Confirm Password" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="staySignedInCheck" />
            <label className="form-check-label" htmlFor="staySignedInCheck">Keep me signed in</label>
          </div>
          <button id="submit-button " type="submit" className="btn btn-primary">Submit</button>
          <a id="signup-btn" href="/login">Login</a>

        </form>
      </div>
    </div>
  );
}

export default SignupPage;