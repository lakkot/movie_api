import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './director-view.scss'

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (

      <Container className="director-container col-6">
        <Row>
          <Row className="button-pane">
            <Link to={'/client'}>
              <Button variant="secondary" type="button" className="back-button">go back</Button>
            </Link>
          </Row>

          <Row className="director-name">
            <h1 className="value">{director.name}</h1>
          </Row>
          <Row className="bio">
            <p className="view-label label">About: </p>
            <p className="value description"> {director.bio}</p>
          </Row>

          <Row className="director-row">
            <p className="view-label label">Birth: </p>
            <p className="value">{director.birth}</p>
          </Row>
          <Row className="director-row">
            <p className="view-label label">Death: </p>
            <p className="value">{director.death}</p>
          </Row>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.string
  }).isRequired
};
