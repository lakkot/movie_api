import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';




import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateUsername } from '../profile-view/update-username';
import { UpdatePassword } from '../profile-view/update-password';
import { UpdateEmail } from '../profile-view/update-email';
import { UpdateBirthday} from '../profile-view/update-birthday';







import './main-view.scss';



export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userData: [],
      register: null,
      username: null
    };
  }



  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }



  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
    //this.getUser(authData.token);
    console.log(authData.user);

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

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://mymovies-database.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favMovies: response.data.favMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
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
    const { movies, user, register } = this.state;

    if (register === false) return <RegistrationView onClick={() => this.dontWantToRegister()} />

    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.isRegistered()} />


    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="container">
          <div className="main-button-area">
            <Link to={`/users/${user}`}>
              <Button variant="secondary" type="button" className="main-button">user profile</Button>
            </Link>
            <Button variant="secondary" type="button" onClick={() => this.logout()} className="main-button">log out</Button>

          </div>
          <div className="main-view row mx-auto movies-list">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.isRegistered()} />;
              return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }
            } />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/users/:username" render={() => <ProfileView  />} />
            <Route path="/update/:username" render={() => <UpdateUsername user={user}/>} />
            <Route path="/password/:username" render={() => <UpdatePassword user={user}/>} />
            <Route path="/email/:username" render={() => <UpdateEmail user={user}/>} />
            <Route path="/birthday/:username" render={() => <UpdateBirthday user={user}/>} />

            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
            <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} />
            }
            } />
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} />
            }
            } />
          </div>
        </div>
      </Router>

    );
  }
}

