import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    //let dbUrl = 'https://mymovies-database.herokuapp.com'
    axios.get('https://mymovies-database.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data

        });
        console.log(movies);
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
          <div className="movie-card" key={movie._id}>{movie.title}</div>
        ))}
      </div>
    );
  }
}