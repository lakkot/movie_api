import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table'
import { format } from "date-fns";
import './profile-view.scss'


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
      favMovies: []
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
          favMovies: response.data.favMovies
        });
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  deleteProfile() {
    axios.delete(`https://mymovies-database.herokuapp.com/users/${username}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        alert('Do you really want to delete your account?')
      })
      .then(res => {
        alert('Account was successfully deleted')
      })
      .then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.setState({
          user: null

        });
        window.open('/', '_self');
      })
      .catch(e => {
        alert('Account could not be deleted ' + e)
      });
  }


  render() {
    const { username, email, birthday, favMovies } = this.state;
    console.log(favMovies);
    return (

      <div className="col-8 mx-auto profile-container"> 
        <Table hover variant="dark" className="table">
          <tbody>
            <tr>
              <td>username</td>
              <td>{username}</td>
              <td>
                <Link to={`/update/${username}`}>
                  <Button variant="secondary" type="button" className="register-button" size="sm">change</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>{email}</td>
              <td>  
                <Link to={`/email/${username}`}>
                  <Button variant="secondary small" type="button" className="register-button" size="sm">change</Button>
                </Link></td>
            </tr>
            <tr>
              <td>birthday</td>
              <td>{birthday && birthday.slice(0, 10)}</td>
              <td>
                <Link to={`/birthday/${username}`}>
                  <Button variant="secondary" type="button" className="register-button" size="sm">change</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
              <Link to={`/password/${username}`}>
          <Button variant="secondary small" type="button" className="password-button" size="sm">change password</Button>
        </Link>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table hover variant="dark" className="table">
          <tbody>
            <tr>
              <td>Favotire movies</td>
            </tr>
            <tr>
              <td>{favMovies}</td>
            </tr>
          </tbody>
        </Table>


      </div>

    )
  }
}

