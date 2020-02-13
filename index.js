//databases for example purposes
let bestMovies = [
  {title: 'Wild at Heart', director: 'David Lynch', genre: ['road', 'romance'], image: './img/wild_at_heart.jpg', id: 1},
  {title: 'Pulp Fiction', director: 'Quentin Tarantino', genre: ['indie', 'crime'], image: './img/pulp_fiction.jpg', id: 2},
  {title: 'Rashomon', director: 'Akira Kurosawa', genre: ['crime', 'mystery'], image: './img/rashomon.jpg', id: 3},
  {title: 'Dr. Strangelove', director: 'Stanley Kubrick', genre: ['war', 'comedy'], image: './img/dr_strangelove.jpg', id: 4},
  {title: 'Down by Law', director: 'Jim Jarmusch', genre: ['indie', 'drama'], image: './img/down_by_law.jpg', id: 5},
]

let directors = [
  {name: 'David Lynch', birth: '', death: '', bio: ''},
  {name: 'Quentin Tarantino', birth: '', death: '', bio: ''},
  {name: 'Stanley Kubrick', birth: '', death: '', bio: ''},
  {name: 'Akira Kurosawa', birth: '', death: '', bio: ''},
  {name: 'Jim Jarmusch', birth: '', death: '', bio: ''},
]

let genres = [
  {name: 'road', description: 'A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives.'},
  {name: 'romance', description: 'Romance film can be defined as a genre wherein the plot revolves around the love between two protagonists.'},
  {name: 'indie', description: ''},
  {name: 'crime', description: ''},
  {name: 'mystery', description: ''},
  {name: 'war', description: ''},
  {name: 'comedy', description: ''},
  {name: 'drama', description: ''},
]

let users = [
  {username: 'user1', password: 'password1', email: 'user1@email.com', birth: '21.09.1989', id: 1},
  {username: 'user2', password: 'password2', email: 'user2@email.com', birth: '14.06.1993', id: 2},
  {username: 'user3', password: 'password3', email: 'user3@email.com', birth: '17.08.2000', id: 3}
]

//this will be created for each user so that favoties are not stored with passwords
let userFavorites = []

//calling modules
const express = require('express'),
  fs = require('fs'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

/*****middleware functions*****/
//reroute requests for static pages to public folder
//app.use(express.static('public')); - this will only work if you put .html at the end of the adress
app.use(express.static('public',{extensions:['html']}));
//create log using morgan module
app.use(morgan('common', {
  stream: fs.createWriteStream('log.txt')
}));
//error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('This one didn\'t go well')
});

//show this if nothing after / is given in website adress request
app.get ('/', function(req, res) {
  res.send('You wanted a list of movies but it is me, the message!!')
});

//show this if /movies site is requested (i.e. pull the table)
app.get('/movies', function(req, res) {
  res.json(bestMovies)
});

//get info by movie title
app.get('/movies/:title', (req, res) => {
  res.json(bestMovies.find( (movie) =>
    { return movie.title === req.params.title }));
});

//add data to movie database

app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'movie title is required';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    bestMovies.push(newMovie);
    res.status(201).send(newMovie);
  }

});

//delete movie from database (by ID)
app.delete('/movies/:id', (req, res) => {
  let movie = bestMovies.find((obj) => {return obj.id = req.params.id});

  if (movie) {
    bestMovies.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send(req.params.id + ' was deleted form the database.')
  }
});





//return data about movie genres
app.get('/genres/:name', (req, res) => {
  res.json(genres.find( (genre) =>
  { return genre.name === req.params.name }));
});

//return data about directors
app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (dir) =>
  { return dir.name === req.params.name }));
});

//adding new users
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username || !newUser.password || !newUser.email) {
    const message = 'user name, password and email are required';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send('user created');
  }
});

//allow users to change username
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.username = req.params.username;
    res.status(201).send('username has been changed');
  } else {
    res.status(404).send('user not found')
  }
});

//allow users do deregister
app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => {return user.id = req.params.id});

  if (user) {
    users.filter(function(user) { return user.id !== req.params.id });
    res.status(201).send(req.params.id + ' was deleted form the database.');
    console.log(users);
  }
});

app.get('/:username/favorites/', (req ,res) => {
  res.json(userFavorites);
});


//adding movie to user favorites list
app.post('/:username/favorites/', (req, res) => {

  let newFav = req.body;

  if (!newFav.title) {
    const message = 'movie title is required';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    bestMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
  /*
    let movie = bestMovies.find((obj) => {return obj.id = req.params.id});
    userFavorites.push(movie);
    res.status(201).send('added to favorites');
    console.log(userFavorites);

    */
});

//removing movies from favorites list
app.delete('/:username/favorites/:id', (req, res) => {
  let removeMovie = userFavorites.find((obj) => {return obj.id = req.params.id});

  if (removeMovie) {
    userFavorites.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send('removed from favorites');
    console.log(userFavorites);
}

});



//listen for requests
app.listen(8080, () => {
  console.log('I\'m always listening.....(on port 8080)')
});
