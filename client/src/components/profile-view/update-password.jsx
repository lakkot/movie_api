import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './profile-view.scss'

export function UpdatePassword(props) {
  const { user } = props;

  const [password, setPassword] = useState('');

  function showErrorMessage($input, message) {
    // go to parent element of where the message should be displayed
    var $container = $input.parentElement;
    //delete the defalut browser messages - if a message shows up, delete it
    var error = $container.querySelector('.error-message');
    if (error) {
      $container.removeChild(error);
    }
    //add your own message (error) to show if the message isn't empty
    if (message) {
      var error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      $container.appendChild(error);
    }
  }

  function validatePassword(e) {
    var $passwordInput = document.querySelector('.password-input');

    var value = $passwordInput.value;

    if (!value) {
      showErrorMessage($passwordInput, 'password is required');
      return false;
    }
    if (value.length < 8) {
      showErrorMessage($passwordInput, 'password must be at least 8 characters long');
      return false;
    }
    handleUpdate(e);
    showErrorMessage($passwordInput, 'password updated');
    return true;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://mymovies-database.herokuapp.com/password/${user}`, {
      password: password,

    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => {
        const data = res.data;
        console.log(data);
        window.open(`/users/${localStorage.getItem('user')}`, '_self');
      })
      .catch(error => {
        console.log('error updating user ' + error);
      });

  }

  return (
    <Form className=" col-5 login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">Your new password: </Form.Label>
        <Form.Control className="password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={password} />
      </Form.Group>
      <div className="change-button-area">
        <Button variant="secondary" type="button" className="login-button" onClick={validatePassword}>update</Button>
      </div>
    </Form>
  );
}
