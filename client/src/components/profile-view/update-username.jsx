import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './profile-view.scss'



export function UpdateUsername(props) {
  const { user } = props;

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://mymovies-database.herokuapp.com/users/${user}`, {
      username: username,

    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
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
        <Form.Label className="profile-label">Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={username} />
      </Form.Group>
      <div className="change-button-area">
  
        <Button variant="secondary" type="button" className="login-button" onClick={handleUpdate}>update</Button>

      </div>
    </Form>
  );
}