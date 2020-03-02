// src/components/movies-list/movies-list.jsx
import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './movies-list.scss';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">

    <Row>
      <div className="filter-input">
        <VisibilityFilterInput id="filter-input" visibilityFilter={visibilityFilter} />
      </div>
    </Row>
    <Row>
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
    </Row>

  </div>;
}

export default connect(mapStateToProps)(MoviesList);