const debug = require('debug')('node-angular');
const http = require('http');
const app = require('./app');

// function that gets a available port number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// error handling function
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit();
      break;
    default:
      throw error;
  }
}

// information on listening
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  debug('Listening on ' + bind);
}

// set port number
const port = normalizePort(process.env.PORT || '3000');
// initialize app using the assigned port number
app.set('port', port);
console.log('Listening on port:', port);

// initialize server using app as the main process
const server = http.createServer(app);
server.on('error', onError);
server.on('Listening', onListening);
server.listen(port);
