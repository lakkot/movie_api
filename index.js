//databases for example purposes

/*
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
*/
//this will be created for each user so that favoties are not stored with passwords
let userFavorites = []

//calling modules
const express = require('express'),
  fs = require('fs'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose');

const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/moviesDB', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

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
  Movies.find().then(function(movies) {res.status(201).json(movies)})
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error: '+ err)
  });
});

//get info by movie title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({title : req.params.title})
  .then((movie) => {res.json(movie)})
  .catch((err) => {console.error(err); res.status(500).send("Error: " + err);});
});

//return data about movie genres
app.get('/movies/genre/:name', (req, res) => {
  Movies.findOne( {'genre.name' : req.params.name})
  .then((movie) => {res.json(movie.genre)})
  .catch((err) => {console.error(err); res.status(500).send("Error: " + err);});
});

//return data about directors
app.get('/movies/director/:name', (req, res) => {
  Movies.findOne( {'director.name' : req.params.name})
  .then((movie) => {res.json(movie.director)})
  .catch((err) => {console.error(err); res.status(500).send("Error: " + err);});
});

//adding new users
app.post('/users', function(req, res) {
  Users.findOne({username: req.body.username}).then(function(user) {
    if (user) {
      return res.status(400).send(req.body.username + ' already exists');
    } else {
      Users.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
      })
      .then(function(user) {res.status(201).json(user)})
      .catch(function(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//allow users to change user data
app.put('/users/:username', function(req, res) {
  Users.findOneAndUpdate({ username : req.params.username }, { $set :
  {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    birthday : req.body.birthday
  }},
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

//check user data by username
app.get('/users/:username', (req, res) => {
  Users.findOne({ username : req.params.username})
  .then((user) => {res.json(user)})
  .catch((err) => {console.error(err); res.status(500).send("Error: " + err);});
});

//allow users do deregister
app.delete('/users/:id', (req, res) => {
  Users.findOneAndRemove({_id : req.params.id})
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
  console.error(err);
  res.status(500).send("Error: " + err);
  });
});

//get list of favorite movies for a user
app.get('/users/:username/movies', (req, res) => {
  Users.findOne({ username : req.params.username})
  .then((user) => {res.json(user.favMovies)})
  .catch((err) => {console.error(err); res.status(500).send("Error: " + err);});
});


//adding movie to user favorites list
app.post('/users/:username/movies/:movieID', function(req, res) {
  Users.findOneAndUpdate({username : req.params.username},
    { $push : { favMovies : req.params.movieID} },
  { new : true},
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

//removing movies from favorites list
app.delete('/users/:username/movies/:movieID', function(req, res) {
  Users.findOneAndUpdate({username: req.params.username},
    { $pull : {favMovies : req.params.movieID} },
    { new : true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

/*********************admin functions********************************/
//add movie to database
app.post('/movies', (req, res) => {
  Movies.findOne({title : req.body.title})
  .then((movie) => {
    if(movie) {
      return res.status(400).send(req.body.title + ' already in database')
    } else {
      Movies.create({
        title: req.body.title,
        description: req.body.description,
        'director.name': req.body.director,
        imageURL: req.body.imageURL
      })
      .then(function(user) {res.status(201).json(user)})
      .catch(function(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
  });

  //delete form database
  app.delete('/movies/:id', (req, res) => {
    Movies.findOneAndRemove({_id : req.params.id})
    .then(function(user) {
      if(!user) {
        res.status(400).send('Movie not found in DB');
      } else {
        res.status(200).send('Movie deleted from the database');
      }
    })
    .catch(function(err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
    });
  });

//listen for requests
app.listen(8080, () => {
  console.log('I\'m always listening.....(on port 8080)')
});
