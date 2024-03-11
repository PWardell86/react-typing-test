import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './FeedbackModal.css';
import { saveFeedback } from '../ServerAPI';


function FeedbackModal() {
  const [show, setShow] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFeedback('');
    setShow(true);

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveFeedback(feedback)
    .then(() => {
      handleClose();
    }).catch((error) => {
      console.log(error);
    });
    handleClose();
  };

  return (
    <>
      <Button id="feedback-btn" variant="text" onClick={handleShow}>
        Feedback
      </Button>

      <Modal className="text-dark" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control as="textarea" rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
            </Form.Group>
            <Button className="btn-main btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FeedbackModal;