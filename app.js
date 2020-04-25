const express = require('express');
const http = require('http');
const path = require('path');
const routes = require('./routes');

// initialize middlewares
const app = express();

const port = 3000;
app.set('port', port);

// set view folder and format
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set data format
app.use(express.json());

// set routes
app.use('/', routes);

// middleware app ready

// create server
const server = http.createServer(app);

// server starts listening
server.listen(port);
console.log('Listening on port: ', port);