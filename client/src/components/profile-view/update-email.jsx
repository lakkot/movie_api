import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export function UpdateEmail (props) {
  const { user } = props;

  //const [username, setUsername] = useState('');
  //const [password, updatePassword] = useState('');
  const [email, setEmail] = useState('');
  //const [birthday, updateBirthday] = useState('');

  //    props.onLoggedIn(username);

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




  return (
    <Form className=" col-5 login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      </Form.Group>
      <div className="change-button-area">
  
        <Button variant="secondary" type="button" className="login-button" onClick={handleUpdate}>update</Button>

      </div>
    </Form>
  );
}



/*
      <div className="button-area">
        <Button variant="secondary" type="button" className="register-button" value={register} onClick={() => props.onClick()}> Register</Button>
        <Button variant="secondary" type="button" className="login-button" onClick={handleSubmit}>Login</Button>
      </div>

      password: password,
      birthday: birthday,
      email: email

      */