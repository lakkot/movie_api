import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';



export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null
    };
  }

  componentDidMount() {
    axios.get('https://mymovies-database.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    );
  }
}