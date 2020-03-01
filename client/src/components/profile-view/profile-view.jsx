import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

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
    let username = localStorage.getItem('user');
    axios.delete(`https://mymovies-database.herokuapp.com/users/${username}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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


  deleteFromFavs(event, itemFromList) {
    event.preventDefault();
    console.log(itemFromList);
    axios.delete(`https://mymovies-database.herokuapp.com/users/${localStorage.getItem('user')}/movies/${itemFromList}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch(event => {
        alert('Oops... something went wrong...');
      });
  }

  render() {
    const { username, email, birthday, favMovies } = this.state;
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
                  <Button variant="secondary small" type="button" className="register-button" size="sm">change</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>password</td>
              <td>********</td>
              <td>
                <Link to={`/password/${username}`}>
                  <Button variant="secondary small" type="button" className="register-button" size="sm">change</Button>
               </Link>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table hover variant="dark" className="table col-6">
          <tbody>
            <tr>
              <td>Favorite movies</td>
              <td></td>
            </tr>
                {favMovies.map(itemFromList => (
                <tr key={itemFromList}>
                  <td>{JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === itemFromList).title} </td>
                  <td><Button className="del-fav"variant="secondary" size="sm" onClick={(event) => this.deleteFromFavs(event, itemFromList)}>Delete</Button></td>
                </tr>)
                )}
          </tbody>
        </Table>
        <div className="bottom">
          <Button variant="primary large" type="button" className="password-button" size="sm" onClick={() => this.deleteProfile()}>DELETE ACCOUNT</Button>
        </div>
      </div>




    )
  }
}

