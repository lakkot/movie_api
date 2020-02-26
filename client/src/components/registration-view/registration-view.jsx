import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss'

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  }

  return (
    <div className="register-container">
      <Form className="col-4 register-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label className="register-label">Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => createUsername(e.target.value)} placeholder="enter your username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="register-label">Password</Form.Label>
          <Form.Control type="text" value={password} onChange={e => createPassword(e.target.value)} placeholder="password" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="register-label">Email address</Form.Label>
          <Form.Control type="email" value={email} onChange={e => createEmail(e.target.value)} placeholder="email" />
        </Form.Group>

        <div className="button-area">
          <Button variant="secondary" type="button" className="register-button" onClick={handleSubmit}>Submit</Button>
        </div>
      </Form>
    </div>
  );
}


