const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  if(q.pathname.includes('documentation')) {
    filePath = (__dirname + 'documentation.html');
  } else {
    filePath = index.html; //optimally should throw 404 error
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  });

}).listen(8080);

fs.appendFile('log.txt', 'URL:' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Added to log.txt');
  }
});


console.log('My first node test server is running on port 8080.');
