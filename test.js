/*

const os = require('os')
console.log('type: ' + os.type());

const fs = require('fs');

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if (err) {throw err;}
  console.log('data: ' + data);
});


*/
const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', function (req, res) {
  res.send('Welcome to my app!');
});
app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080);
