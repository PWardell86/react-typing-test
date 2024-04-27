import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { signUp } from "../../ServerAPI";

function SignupModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    document.getElementById("signin-btn-spin").removeAttribute("hidden");
    signUp(username, password)
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          alert("Hmmm, the server won't respond... \n\nPlease try again later");
        }
        console.log(error);
      }).finally(() => {
        document.getElementById("signin-btn-spin").setAttribute("hidden", true);
      });
  }

  return (
    <>
      <Button
        id="signup-btn"
        variant="secondary"
        onClick={handleShow}
      >
        Sign Up
      </Button>

      <Modal
        className="text-dark"
        show={show}
        onHide={handleClose}
        size="sm"
        centered
      >
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="signup-username"
                as="input"
                value={username}
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                required

              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-3"
                id="signup-password"
                as="input"
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control
                className="mb-3"
                as="input"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className="btn-main btn"
              variant="primary"
              type="submit"
            >
              <span id="signin-btn-spin" className="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden></span>
              <span>Submit</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignupModal;
