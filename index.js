//calling modules
const express = require('express'),
  morgan = require('morgan');
const app = express();

//random database for example purposes
let bestMovies = [
  {title: 'Wild at Heart', director: 'David Lynch'},
  {title: 'Pulp Fiction', director: 'Quentin Tarantino'},
  {title: 'Rashomon', director: 'Akira Kurosawa'},
  {title: 'Dr. Strangelove', director: 'Stanley Kubrick'},
  {title: 'Down by Law', director: 'Jim Jarmusch'},
]

/*****middleware functions*****/
//reroute requests for static pages to public folder
//app.use(express.static('public')); - this will only work if you put .html at the end of the adress
app.use(express.static('public',{extensions:['html']}));
//create log using morgan module
app.use(morgan('common'));
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
app.get('/movies', function(req, res){
  res.json(bestMovies)
});

//listen for requests
app.listen(8080, () => {
  console.log('I\'m always listening.....(on port 8080)')
});
