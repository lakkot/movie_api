import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './movie-view.scss'


export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }


  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;




    return (

      <Container>
        <Row>
          <Row className="button-pane">
            <Button variant="secondary" type="button" className="back-button" onClick={() => onClick()}>go back</Button>
          </Row>
          <Col xs={12} md={6} className="view-description">

            <Row className="description-row movie-title">
              <p className="label">Title: </p>
              <p className="value">{movie.title}</p>
            </Row>
            <Row className="description-row movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.description}</span>
            </Row>

            <Row className="description-row movie-genre">
              <span className="label">Genre: </span>
              <span className="value">{movie.genre.name}</span>
            </Row>
            <Row className="description-row movie-director">
              <span className="label">Director: </span>
              <span className="value">{movie.director.name}</span>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <img className="movie-poster" src={movie.imageURL} />
          </Col>
        </Row>
      </Container>
      /*
            <div className="movie-view">
              <img className="movie-poster" src={movie.imageURL} />
              <div className="button-pane">
                <button onClick={() => onClick()} className="button">go back</button>
      
              </div>
      
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.description}</span>
              </div>
      
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.genre.name}</span>
              </div>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.director.name}</span>
              </div>
            </div>
      
            */
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};