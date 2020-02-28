import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './profile-view.scss'

import { Link } from "react-router-dom";


export function ProfileView(props) {

  const { movies, userProfile, token } = props;


  const [username, setUsername] = useState(username);
  const [password, setPassword] = useState(password);
  const [email, setEmail] = useState(email);
  const [birthday, setBirthday] = useState(birthday);



  const handleUpdate = (e) => {
    axios.put('https://mymovies-database.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data)
      })
      .catch(e => {
        console.log('profile not updated')
      });



    console.log(username, password, email, birthday);

  }

  return (

    <Form className="col-6 register-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label className="profile-label">Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={username} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="profile-label">Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label className="profile-label">Date of Birth</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <div className="profile-button-area">
        <Link to={'/'}>
          <Button variant="secondary" type="button" className="register-button">Cancel</Button>
        </Link>
        <Button variant="secondary" type="button" className="register-button" onClick={handleUpdate}>Save</Button>
      </div>
    </Form>

  );
}


