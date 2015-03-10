'use strict';

// Load configuration
global.ENV = process.env.NODE_ENV || "development";
global.LISTEN_PORT = process.env.API_PORT || 8081;

console.log("API starting. Env: " + global.ENV + ". Listening on port: " + global.LISTEN_PORT);

// Load libraries
var express = require('express'),
  app = express();

// Start services
app.listen(global.LISTEN_PORT);

app.get('/test', function (req, res) {
  res.send('Hello world! This data is from the API! Version 0.0003');
});
