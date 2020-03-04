import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './profile-view.scss'

export function UpdateUsername(props) {
  const { user } = props;

  const [username, setUsername] = useState('');

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
    var $userInput = document.querySelector('.login-input');
    var value = $userInput.value;

    if (!value) {
      showErrorMessage($userInput, 'username is required');
    }

    if (/[^a-zA-Z0-9]/.test(value)) {
      showErrorMessage($userInput, 'use only alphanumeric characters');
      return false;
    }

    handleUpdate(e);
    showErrorMessage($userInput, 'username updated');
    return true;
  }


  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://mymovies-database.herokuapp.com/users/${user}`, {
      username: username,
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => {
        const data = res.data;
        localStorage.setItem('user', data.username);
        window.open(`/users/${localStorage.getItem('user')}`, '_self');
      })
      .catch(error => {
        console.log('error updating user ' + error);
      });

  }

  return (
    <Form className=" col-5 login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">New username: </Form.Label>
        <Form.Control className="login-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <div className="change-button-area">

        <Button variant="secondary" type="button" className="login-button" onClick={validateUsername}>update</Button>

      </div>
    </Form>
  );
}