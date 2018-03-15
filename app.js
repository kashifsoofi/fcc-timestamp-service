'use strict';

const express = require('express');
const path = require("path");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const timestamp = require('./api/controllers/timestamp.js')

var options = {
  explorer : true
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  //res.sendFile('index.html');
  var appUrl = req.protocol + '://' + req.get('host') + '/';
  res.render('index', { appUrl: appUrl });
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.get('/:query', timestamp.get);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Timestamp microservice listening on port ' + port + '!');
});

