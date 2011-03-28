var app = require('express').createServer(),
    request = require('request'),
    twitter = require('twitter'),
    quotes = require('./lib/twitter');
var twit = new twitter();
var Quotes = new quotes.twitter(twit);


/*
var twitter = function() {
  var url = 'http://search.twitter.com';

  this.search = function(terms, callback) {
    var uri = url + '/search.json?q=' + terms;
    request({uri: uri}, function (err, resp, body) {
      console.log(resp);
      if (err) throw err;
      callback(body);
    });
  };
}

var twit = new twitter();
*/

app.get('/', function(req, res){

});

app.listen(3000);
