//import http, file system and url modules
const http = require('http'),
  fs = require('fs'),
  url = require('url');


http.createServer((request, response) => {
  // addr = url
  var addr = request.url,
  // parse the adress and save it to variable q
  q = url.parse(addr, true),
  // creating container where later the new url will be stored
  filePath = '';

  //if path includes documentation, then filepath = current directory path + documentation.html
  if(q.pathname.includes('documentation')) {
    filePath = (__dirname + 'documentation.html');
  } else {
    filePath = index.html; //optimally should throw 404 error
  }
  //get appropriate file from the server
  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
    //response sent to client
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  });

}).listen(8080);
// add activity to log.txt
fs.appendFile('log.txt', 'URL:' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Added to log.txt');
  }
});


console.log('My first node test server is running on port 8080.');
