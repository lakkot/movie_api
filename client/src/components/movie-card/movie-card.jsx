import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

let descriptionLength = 200;

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    return (
      <Card className="ml-1 mt-1 card" style={{ width: '15rem' }}>
        <Card.Img className="card-image" variant="top" src={movie.imageURL} />
        <Card.Body>
          <Card.Title >
            <Button className="card-title" onClick={() => onClick(movie)} variant="link">{movie.title}</Button>
          </Card.Title>
          {movie.description.length > descriptionLength
            ? <Card.Text className="card-description">{movie.description.substring(0, descriptionLength)}...</Card.Text>
            : <Card.Text className="card-description">{movie.description}</Card.Text>
          }
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};