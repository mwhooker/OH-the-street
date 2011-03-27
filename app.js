var app = require('express').createServer(),
    request = require('request'),
    twitter = require('twitter');
var twit = new twitter();


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

  twit.search('OH OR #OH', function(data) {
    console.log(data);
    res.send(data);
  });
});

app.listen(3000);
