import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { login } from '../../ServerAPI';
import './Form.css';

function LoginModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginErrorMessage = 'bad-login-message';
  const loginUsernameInput = 'login-username';
  const loginPasswordInput = 'login-password';

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setPassword('');
    setUsername('');
    setShow(true);
  };

  const handleBadLogin = () => {
    document.getElementById(loginUsernameInput).classList.add('failed');
    document.getElementById(loginPasswordInput).classList.add('failed');
    document.getElementById(loginErrorMessage).style.display = 'block';
  }
  const resetBadLogin = () => {
    document.getElementById(loginUsernameInput).classList.remove('failed');
    document.getElementById(loginPasswordInput).classList.remove('failed');
    document.getElementById(loginErrorMessage).style.display = 'none';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginSpinny = document.getElementById('login-btn-spin');
    loginSpinny.removeAttribute('hidden');
    login(username, password)
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          handleBadLogin();
        } else {
          alert('Could not connect to the server. Please try again later.');
        }
      }).finally(() => {
        loginSpinny.setAttribute('hidden', true);
      });
  }

  return (
    <>
      <Button
        id="login-btn"
        variant="text"
        onClick={handleShow}
      >
        Login
      </Button>

      <Modal
        className="text-dark"
        show={show}
        onHide={handleClose}
        size="sm"
        centered
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
            // id="username"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="login-username"
                as="input"
                value={username}
                placeholder="Enter Username"
                onChange={(e) => { resetBadLogin(); setUsername(e.target.value) }}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
            // id="username"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="login-password"
                as="input"
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => { resetBadLogin(); setPassword(e.target.value) }}
                required
              />
            </Form.Group>
            <p className="bad-message" id="bad-login-message">Your username or password is incorrect</p>
            <Button
              className="btn-main btn"
              variant="primary"
              type="submit"
            >
              <span id="login-btn-spin" className="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden></span>
              <span id="submit-btn-spin">Submit</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
