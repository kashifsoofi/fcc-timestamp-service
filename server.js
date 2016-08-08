var express = require("express");
var moment = require("moment");
var app = express();

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/:date', function (req, res) {
  var format = "";
  if (req.params.date === parseInt(req.params.date, 10)) {
    format = "X";
  }
  else {
    format = "MMMM D, YYYY";
  }
  var date = moment(req.params.date, format);
  
  if (date.isValid()) {
    res.json({
      unix: date.format("X"),
      natural: date.format("MMM D, YYYY")
    });
  }
  else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});