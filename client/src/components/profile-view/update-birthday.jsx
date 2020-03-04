import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './profile-view.scss'

export function UpdateBirthday(props) {
  const { user } = props;

  const [birthday, setBirthday] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://mymovies-database.herokuapp.com/birthday/${user}`, {
      birthday: birthday
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label className="profile-label">Update date of birth</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <div className="change-button-area">
        <Button variant="secondary" type="button" className="login-button" onClick={handleUpdate}>update</Button>
      </div>
    </Form>
  );
}
