// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create an instance of express to serve our end points
const app = express();
app.use(express.json())
app.use(cors({
  origin: '*'
}));

app.use(function (req, res, next) {
  console.log('origin', req.headers.origin)

  res.setHeader('Access-Control-Allow-Origin', `${req.headers.origin}`);

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  next();

});

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);

// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});