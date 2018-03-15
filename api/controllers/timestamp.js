'use strict;'

var moment = require("moment");

module.exports = { get };

function get(req, res, next) {
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
}