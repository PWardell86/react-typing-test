import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { login } from "../ServerAPI";
import './Form.css';

function LoginModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setPassword("");
    setUsername("");
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          alert("Hmmm, the server won't respond... \n\nPlease try again later");
        }
      });
  }

  return (
    <>
      <Button
        id="login-btn"
        className="btn-text"
        variant="link"
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className="btn-main btn"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
