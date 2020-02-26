import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss'

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');



  const handleSubmit = (e) => {
    //send data to mongo somehow
    console.log(username, password, email, birthday);

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
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label className="register-label">Date of Birth</Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
        </Form.Group>
        <div className="register-button-area">
          <Button variant="secondary" type="button" className="register-button" onClick={() => props.onClick()}>Cancel</Button>
          <Button variant="secondary" type="button" className="register-button" onClick={handleSubmit}>Submit</Button>
        </div>
      </Form>
    </div>
  );
}


