import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';





export function UpdateEmail(props) {
  const { user } = props;
  const [email, setEmail] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://mymovies-database.herokuapp.com/email/${user}`, {
      email: email

    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        const data = res.data;
        window.open(`/users/${localStorage.getItem('user')}`, '_self');
      })
      .catch(error => {
        console.log('error updating user ' + error);
      });

  }

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
    handleUpdate(e);
    showErrorMessage($emailInput, 'email updated');
    return true;
  }

  return (
    <Form className=" col-5 login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">Change email address</Form.Label>
        <Form.Control type="email" value={email} className="email-input form-control" onChange={e => setEmail(e.target.value)} placeholder="email" required />
      </Form.Group>
      <div className="change-button-area">

        <Button variant="secondary" type="button" className="login-button" onClick={validateEmail}>update</Button>

      </div>
    </Form>
  );
}