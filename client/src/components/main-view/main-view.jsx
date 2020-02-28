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



import './main-view.scss';



export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userData: [],
      register: null
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
          <div className="logout-button">
            <Link to={`/users/${user}`}>
              <Button variant="secondary" type="button">user settings</Button>
            </Link>
            <Button variant="secondary" type="button" onClick={() => this.logout()}>log out</Button>
          </div>
          <div className="main-view row mx-auto movies-list">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.isRegistered()} />;
              return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }
            } />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/users/:username" render={() => <ProfileView  />} />
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

/*
export function ProfileView(props) {

  const { userData, token } = props;

  const [username, setUsername] = useState(username);
  const [password, setPassword] = useState(password);
  const [email, setEmail] = useState(email);
  const [birthday, setBirthday] = useState(birthday);
console.log(userData);


  const handleUpdate = (e) => {
    axios.put(`https://mymovies-database.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      username: username,
      password: password,
      email: email,
      birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data)
      })
      .catch(e => {
        console.log('profile not updated')
      });



    console.log(username, password, email, birthday);

  }


  return (



    < Form className="col-6 register-form" >
      <Form.Group controlId="formBasicUsername">
        <Form.Label className="profile-label">Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={username} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="profile-label">Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="profile-label">Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label className="profile-label">Date of Birth</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <div className="profile-button-area">
        <Link to={'/'}>
          <Button variant="secondary" type="button" className="register-button">Cancel</Button>
        </Link>
        <Button variant="secondary" type="button" className="register-button" onClick={handleUpdate}>Save</Button>
      </div>
    </Form >

  );
}
*/