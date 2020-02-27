import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login-view.scss';


export function LoginView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, setRegister } = useState('');
  //    props.onLoggedIn(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('http://127.0.0.1:8080/login'/*'https://mymovies-database.herokuapp.com/login'*/, {
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

  const isRegistered = () => {
    console.log('at least its connected');
    ({ register: false })
  }

  return (
    <div className="login-container">
      <Form className="col-4 login-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="login-label">Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter your username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="login-label">Password</Form.Label>
          <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        </Form.Group>
        <div className="button-area">
          <Button variant="secondary" type="button" className="register-button" value={register} onClick={() => props.onClick()}> Register</Button>
          <Button variant="secondary" type="button" className="login-button" onClick={handleSubmit}>Login</Button>
        </div>
      </Form>
    </div >
  );
}

/*
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter your username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>Login</Button>
    </Form>

    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit} >Submit</button>
    </form>



*/