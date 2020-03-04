import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss'

import { Link } from "react-router-dom";


export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');


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

  function validateUsername(e) {
    var $userInput = document.querySelector('.username-input');
    var value = $userInput.value;
    if (!value) {
      showErrorMessage($userInput, 'username is required');
    }
    if (/[^a-zA-Z0-9]/.test(value)) {
      showErrorMessage($userInput, 'use only alphanumeric characters');
      return false;
    }
    validatePassword(e);
    showErrorMessage($userInput, 'username correct');
    return true;
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
    validateEmail(e);
    showErrorMessage($passwordInput, 'password correct');
    return true;
  }

  function validateEmail(e) {
    var $emailInput = document.querySelector('.email-input');
    var value = $emailInput.value;

    if (!value) {
      showErrorMessage($emailInput, 'e-mail is required');
      return false;
    }
    if (value.indexOf('@') === -1 && value.indexOf('.') === -1) {
      showErrorMessage($emailInput, 'enter a valid e-mail address');
      return false;
    }
    handleSubmit(e);
    showErrorMessage($emailInput, 'email correct');
    return true;
  }



  const handleSubmit = (e) => {
    axios.post('https://mymovies-database.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    })
      .then(response => {
        const data = response.data;
        window.open('/', '_self'); //_self means that it will open in the same browser window
      })
      .catch(e => {
        console.log('error in registration')
      });



    //console.log(username, password, email, birthday);

  }


  return (
    <Form className="col-4 register-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label className="register-label">Username: </Form.Label>
        <Form.Control type="text" value={username} className="username-input" onChange={e => createUsername(e.target.value)} placeholder="enter your username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="register-label">Password</Form.Label>
        <Form.Control type="password" value={password} className="password-input" onChange={e => createPassword(e.target.value)} placeholder="password" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="register-label">Email address</Form.Label>
        <Form.Control type="email" value={email} className="email-input" onChange={e => createEmail(e.target.value)} placeholder="email" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label className="register-label">Date of Birth</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
      </Form.Group>
      <div className="register-button-area">
        <Link to={'/'}>
          <Button variant="secondary" type="button" className="register-button">Cancel</Button>
        </Link>
        <Button variant="secondary" type="button" className="register-button" onClick={validateUsername}>Submit</Button>
      </div>
    </Form>
  );
}


