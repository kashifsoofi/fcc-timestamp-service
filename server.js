var express = require("express");
var path = require("path");
var moment = require("moment");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  //res.sendFile('index.html');
  var appUrl = req.protocol + '://' + req.get('host') + '/';
  res.render('index', { appUrl: appUrl });
});

app.get('/:query', function (req, res) {
  var format = "";
  if (/^\d+$/.test(req.params.query)) {
    format = "X";
  }
  else {
    format = "MMMM D, YYYY";
  }
  console.log('query: ' + req.params.query + '  format: ' + format);
  var date = moment(req.params.query, format);
  
  if (date.isValid()) {
    res.json({
      unix: date.format("X"),
      natural: date.format("MMMM D, YYYY")
    });
  }
  else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Timestamp microservice listening on port ' + port + '!');
});