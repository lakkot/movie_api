import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './profile-view.scss'


export function UpdatePassword (props) {
  const { user } = props;

  const [password, setPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://mymovies-database.herokuapp.com/password/${user}`, {
      password: password,

    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        const data = res.data;
        window.open(`/users/${localStorage.getItem('user')}`);
      })
      .catch(error => {
        console.log('error updating user ' + error);
      });

  }

  return (
    <Form className=" col-5 login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">Passwrd: </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={password} />
      </Form.Group>
      <div className="change-button-area">
  
        <Button variant="secondary" type="button" className="login-button" onClick={handleUpdate}>update</Button>

      </div>
    </Form>
  );
}