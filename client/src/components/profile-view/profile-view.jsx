import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";

import './profile-view.scss'

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null);

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
    const { userData } = this.props;
    const { favMovies } = this.props.userData.favMovies;
    console.log(favMovies);
    /*
        if (favMovies) {
          var favMoviesList = favMovies.map(itemFromList => (
            <tr key={itemFromList}>
              <td>{JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === itemFromList).title} </td>
              <td><Button className="del-fav" variant="secondary" size="sm" onClick={(event) => this.deleteFromFavs(event, itemFromList)}>Delete</Button></td>
            </tr>)
          )
        }
    */
    return (

      <div className="col-8 mx-auto profile-container">
        <Table hover variant="dark" className="table">
          <tbody>
            <tr>
              <td>username</td>
              <td>{userData.username}</td>
              <td>
                <Link to={`/update/${userData.username}`}>
                  <Button variant="secondary" type="button" className="register-button" size="sm">change</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>{userData.email}</td>
              <td>
                <Link to={`/email/${userData.username}`}>
                  <Button variant="secondary small" type="button" className="register-button" size="sm">change</Button>
                </Link></td>
            </tr>
            <tr>
              <td>birthday</td>
              <td>{userData.birthday && userData.birthday.slice(0, 10)}</td>
              <td>
                <Link to={`/birthday/${userData.username}`}>
                  <Button variant="secondary small" type="button" className="register-button" size="sm">change</Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>password</td>
              <td>********</td>
              <td>
                <Link to={`/password/${userData.username}`}>
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
            {favMoviesList}
          </tbody>
        </Table>
        <div className="bottom">
          <Button variant="primary large" type="button" className="password-button" size="sm" onClick={() => this.deleteProfile()}>DELETE ACCOUNT</Button>
        </div>
      </div>





    )
  }
}
/*
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    favMovies: PropTypes.array
  }),
  token: PropTypes.string.isRequired,
};

*/