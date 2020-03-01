import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";


import './movie-view.scss'


export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  
  addToFavorites(e) {
    const {movie} = this.props;
    e.preventDefault();
    axios.post(`https://mymovies-database.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`,  {username: localStorage.getItem('user') }, 
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      alert(`${movie.title}  added to favorites`);
    })
    .then(res => {
      document.location.reload(true);
    })
    .catch(error => {
      alert(`${movie.title} not added to favorites` + error)
    });
  } 

  render() {
    const { movie } = this.props;

    if (!movie) return null;


    return (

      <Container className="view-container">
        <Row>
          <Row className="button-pane">
            <Link to={'/'}>
              <Button variant="secondary" type="button" className="back-button">go back</Button>
            </Link>
            <Button variant="secondary" type="button" className="back-button" onClick={(e) => this.addToFavorites(e)}>add to favorites</Button>
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
/*
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
*/