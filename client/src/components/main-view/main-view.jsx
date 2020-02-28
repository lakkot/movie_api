import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';


import './main-view.scss';



export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null,
    };
  }



  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }



  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://mymovies-database.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
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


  isRegistered = () => {
    this.setState({ register: false })
  }

  dontWantToRegister = () => {
    this.setState({ register: null })
  }



  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (register === false) return <RegistrationView onClick={() => this.dontWantToRegister()} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.isRegistered()} />


    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="col container">
        <div className="main-view row mx-auto movies-list">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(null)} />
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
            ))
          }
        </div>
      </div>
    );
  }
}