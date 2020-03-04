import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import SortFilterDropdown from '../sort-filter/sort-filter';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from 'react-loader-spinner';

import './movies-list.scss';
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//make this information available as props
const mapStateToProps = state => {
  const { visibilityFilter, sortFilter } = state;
  return { visibilityFilter, sortFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, sortFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  switch (sortFilter) {
    case 'title':
      filteredMovies.sort((a, b) => (a.title > b.title) ? 1 : -1)
      break;
    case 'director':
      filteredMovies.sort((a, b) => (a.director.name > b.director.name) ? 1 : -1)
      break;
    case 'genre':
      filteredMovies.sort((a, b) => (a.genre.name > b.genre.name) ? 1 : -1)
      break;
    case '':
      filteredMovies.sort((a, b) => (a._id > b._id) ? 1 : -1)
      break;
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">

    <Col>
      <Row>
        <div className="filter-input movie-list-button">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </div>
        <SortFilterDropdown className="movie-list-button" sortFilter={sortFilter} />

      </Row>
      <Row>
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
      </Row>
    </Col>

    <div className="justify-content-center spinner">
      <Loader
        className="justify-content-center"
        type="TailSpin"
        color="rgb(223, 219, 219)"
        height={150}
        width={150}
        timeout={10000} //10 secs
      />
    </div>

  </div>;
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    })
  ).isRequired
};