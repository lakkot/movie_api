//calling modules
const express = require('express'),
  fs = require('fs'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  path = require("path"),
  bcrypt = require('bcrypt');


const { check, validationResult } = require('express-validator');
const passport = require('passport');
require('./passport');

const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb+srv://myMoviesDBadmin:sk0wyc3y@mymoviesdb-jrstu.mongodb.net/moviesDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/moviesDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const app = express();
app.use(bodyParser.json());
//importing authentication file into the project
var auth = require('./auth')(app); //this needs to be put ALWAYS after app.use(bodyParser.json());


app.use(cors({ origin: 'http://localhost:1234' }));


var allowedOrigins = ['http://localhost:1234'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));


/*****middleware functions*****/
//reroute requests for static pages to public folder
//app.use(express.static('public')); - this will only work if you put .html at the end of the adress
app.use(express.static('public', { extensions: ['html'] }));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
//create log using morgan module
app.use(morgan('common', {
  stream: fs.createWriteStream('log.txt')
}));
//error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('This one didn\'t go well')
});

//show this if nothing after / is given in website adress request
app.get('/', function (req, res) {
  //res.send('You wanted a list of movies but it is me, the message!!');
  res.redirect('/client');
});

//show this if /movies site is requested (i.e. pull the table)
app.get('/movies', /*passport.authenticate('jwt', { session: false }),*/ function (req, res) {
  Movies.find().then(function (movies) { res.status(201).json(movies) })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
});

//get info by movie title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then((movie) => { res.json(movie) })
    .catch((err) => { console.error(err); res.status(500).send("Error: " + err); });
});

//return data about movie genres
app.get('/movies/genre/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'genre.name': req.params.name })
    .then((movie) => { res.json(movie.genre) })
    .catch((err) => { console.error(err); res.status(500).send("Error: " + err); });
});

//return data about directors
app.get('/movies/director/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'director.name': req.params.name })
    .then((movie) => { res.json(movie.director) })
    .catch((err) => { console.error(err); res.status(500).send("Error: " + err); });
});

//adding new users
app.post('/users',
  [
    check('username', 'username needs to be at least 6 characters long').isLength({ min: 5 }),
    check('username', 'Use alphanumeric characters only').isAlphanumeric(),
    check('password', 'Password required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail()
  ], (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.password)
    Users.findOne({ username: req.body.username }).then(function (user) {
      if (user) {
        return res.status(400).send(req.body.username + ' already exists');
      } else {
        Users.create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday
        })
          .then(function (user) { res.status(201).json(user) })
          .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    }).catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
  });

//change username
app.put('/users/:username', passport.authenticate('jwt', { session: false }),
  [
    check('username', 'username needs to be at least 6 characters long').isLength({ min: 5 }),
    check('username', 'Use alphanumeric characters only').isAlphanumeric(),
  ], (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        username: req.body.username,
      }
    },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser)
        }
      })

  });

//change password
app.put('/password/:username', passport.authenticate('jwt', { session: false }),
  [
    check('password', 'Password required').not().isEmpty(),
  ], (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        password: hashedPassword,
      }
    },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser)
        }
      })

  });

//change email
app.put('/email/:username', passport.authenticate('jwt', { session: false }),
  [
    check('email', 'Email is not valid').isEmail()
  ], (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        email: req.body.email,
      }
    },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser)
        }
      })

  });

//change birthday
app.put('/birthday/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Users.findOneAndUpdate({ username: req.params.username }, {
    $set:
    {
      birthday: req.body.birthday
    }
  },
    { new: true },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })

});

//check user data by username
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => { res.json(user) })
    .catch((err) => { console.error(err); res.status(500).send("Error: " + err); });
});

//allow users do deregister
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then(function (user) {
      if (!user) {
        res.status(400).send('User ' + req.params.username + " was not found");
      } else {
        res.status(200).send('User ' + req.params.username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get list of favorite movies for a user
app.get('/users/:username/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => { res.json(user.favMovies) })
    .catch((err) => { console.error(err); res.status(500).send("Error: " + err); });
});


//adding movie to user favorites list
app.post('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ username: req.params.username },
    { $push: { favMovies: req.params.movieID } },
    { new: true },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

//removing movies from favorites list
app.delete('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ username: req.params.username },
    { $pull: { favMovies: req.params.movieID } },
    { new: true },
    function (err, updatedUser) {
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
app.post('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.body.title })
    .then((movie) => {
      if (movie) {
        return res.status(400).send(req.body.title + ' already in database')
      } else {
        Movies.create({
          title: req.body.title,
          description: req.body.description,
          'director.name': req.body.director,
          imageURL: req.body.imageURL
        })
          .then(function (user) { res.status(201).json(user) })
          .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    }).catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//delete form database
app.delete('/movies/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOneAndRemove({ _id: req.params.id })
    .then(function (user) {
      if (!user) {
        res.status(400).send('Movie not found in DB');
      } else {
        res.status(200).send('Movie deleted from the database');
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//listen for requests
app.listen(process.env.PORT || 8080, () => {
  console.log('I\'m always listening.....(on port 8080)')
});


/*
  app.put('/users/:username', passport.authenticate('jwt', { session: false }),
  [
    check('username', 'username needs to be at least 6 characters long').isLength({ min: 5 }),
    check('username', 'Use alphanumeric characters only').isAlphanumeric(),
    //check('password', 'Password required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail()
  ], (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday
      }
    },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser)
        }
      })

  });
*/
