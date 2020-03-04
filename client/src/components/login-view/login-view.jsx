import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useState('');
  //props.onLoggedIn(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://mymovies-database.herokuapp.com/login', {
      username: username,
      password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Form className=" col-5 login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="login-label">Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter your username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="login-label">Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      </Form.Group>
      <div className="button-area">
        <Link to={'/client/register'}>
          <Button variant="secondary" type="button" className="register-button" value={register}>Register</Button>
        </Link>
        <Button variant="secondary" type="button" className="login-button" onClick={handleSubmit}>Login</Button>
      </div>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};