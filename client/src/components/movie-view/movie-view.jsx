import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './movie-view.scss'
import addfav from "./img/heart1.svg"
import remfav from "./img/heart2.svg"

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
    };

  }

  componentDidMount() {
    const {userData} = this.props;
    console.log(userData);
  }

  deleteFromFavs(e) {
    const { movie } = this.props;
    console.log(movie._id)
    axios.delete(`https://mymovies-database.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        document.location.reload(true);
      })
      .catch(event => {
        alert('Oops... something went wrong...');
      });
  }

  addToFavorites(e) {
    const { movie } = this.props;
    axios.post(`https://mymovies-database.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, { username: localStorage.getItem('user') },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        document.location.reload(true);
        this.setState
      })

      .catch(error => {
        alert(`${movie.title} not added to favorites` + error)
      });
  }

  toggleFavorites(e) {
    
    const { movie, userData, favMovies } = this.props;
    console.log(userData)
    if (!favMovies) {
      var favClass = "hidden"
    } else {
      var favClass = "";
      var isUser = "hidden";
    }

    if (favMovies) {
      if (favMovies.find(m => m === movie._id)) { //get movie ID from props and it should work
        return <button onClick={() => this.deleteFromFavs(e)} className="favbutton"><img src={remfav} className={`fav + ${favClass}`} alt="Twittsder"></img></button>;
        //this.deleteFromFavs(e);
      } else {
        return <button onClick={() => this.addToFavorites(e)} className="favbutton"><img src={addfav} className={`fav + ${favClass}`} alt="Twittsder"></img></button>;
        //this.addToFavorites(e);
      }
    } else {
      return <p className={`login-message align-me + ${isUser}`}>log in to add movie to favorites</p>    
  }
    
  }

  changeButton() {
    const { movie, favMovies } = this.props;
    if (favMovies) {
      if (favMovies.find(m => m === movie._id)) {
        return 'remove from favorites';
      } else {
        return 'add to favorites';
      }
    }

  }

  render() {
    const { userData, movie, favMovies } = this.props;
    if (!movie) return null;

    const button = this.changeButton();
    const favs = this.toggleFavorites();

    if (!favMovies) {
      var favClass = "hidden"
    } else {
      var favClass = "";
      var isUser = "hidden";
    }

    console.log(userData);
    return (

      <Container className="view-container">
        
        <Row>
          <Row className="view-button-pane">
            <div>
              <Link to={'/'}>
                <Button variant="secondary" type="button" className="view-button">go back</Button>
              </Link>
            </div>
            <div>
              {favs}
            </div>
          </Row>
          <Col xs={12} md={6} className="view-description">
            <Row className="movie-title">
              <h1 className="value">{movie.title}</h1>
            </Row>
            <Row className="movie-description">
              <p className="view-label label">Description: </p>
              <p className="value description"> {movie.description}</p>
            </Row>
            <Row className="description-row movie-genre">
              <span className="view-label label">Genre: </span>
              <Link to={`/genres/${movie.genre.name}`}>
                <span className="value">{movie.genre.name}</span>
              </Link>
            </Row>
            <Row className="description-row movie-director">
              <span className="view-label label">Director: </span>
              <Link to={`/directors/${movie.director.name}`}>
                <span className="value">{movie.director.name}</span>
              </Link>

            </Row>
          </Col>
          <Col xs={12} md={6}>
            <img className="movie-poster" src={movie.imageURL} />
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string
    }),
  }).isRequired
};


/*
            <Button variant="secondary" type="button" className="view-button" onClick={(e) => this.toggleFavorites(e)}>{button}</Button>
*/