import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

import { Link } from "react-router-dom";

let descriptionLength = 200;

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card className="ml-1 mt-1 card" style={{ width: '15rem' }}>
        <Card.Img className="card-image" variant="top" src={movie.imageURL} />
        <Card.Body>
          <Card.Title >
            <Link to={`/movies/${movie._id}`}>
              <Button className="card-title" variant="link">{movie.title}</Button>
            </Link>
          </Card.Title>
          {movie.description.length > descriptionLength
            ? <Card.Text className="card-description">{movie.description.substring(0, descriptionLength)}...</Card.Text>
            : <Card.Text className="card-description">{movie.description}</Card.Text>
          }
        </Card.Body>
      </Card >
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired
};