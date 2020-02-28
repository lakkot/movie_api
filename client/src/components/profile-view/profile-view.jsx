import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './profile-view.scss'
import ListGroup from 'react-bootstrap/ListGroup';


import { Link } from "react-router-dom";


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favouriteMovies: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://mymovies-database.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favouriteMovies: response.data.favMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { username, email, birthday, favouriteMovies } = this.state;

    return (
      <ListGroup className="list-group-flush" variant="flush">
            <ListGroup.Item>Username: {username}</ListGroup.Item>
      </ListGroup>
    )
  }
}
