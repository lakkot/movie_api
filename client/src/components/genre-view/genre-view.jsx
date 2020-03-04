import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './genre-view.scss'

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (

      <Container className="genre-container col-6">
        <Row>
          <Row className="button-pane">
            <Link to={'/'}>
              <Button variant="secondary" type="button" className="back-button">go back</Button>
            </Link>
          </Row>

          <Row className="genre-name">
            <h1 className="value">{genre.name}</h1>
          </Row>
          <Row className="genre-description">
            <p className="view-label label">Description: </p>
            <p className="value description"> {genre.description}</p>
          </Row>
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired
};