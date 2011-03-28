var redis = require('redis');

var redisClient = redis.createClient(6379, 'localhost');

exports.twitter = function(client) {
  var twitterClient = client;
  var QUERY_STRING = '#OH';
  var latestKey = 'latestIdx';
  var starredKey = 'starredIdx';

  this.getLatest = function(n, callback) {
    var that = this;
    //get latest n tweets
    redisClient.lrange(latestKey, 0, n - 1, function(err, reply) {
      that.getQuotes(reply, function(quotes) {
        callback(quotes);
      });
    });
  };
  this.getRandom = function(n, callback) {
    //get n random tweets
  };
  this.getTopStarred = function(n, callback) {
    //get n most starred tweets
  };

  this.addToLatest = function(key) {
    // add to the latest index
    redisClient.lpush(latestKey, key);
    // Make sure list is at max 100 entries
    redisClient.ltrim(latestKey, 0, 99);
  };

  this.addQuote = function(tweet) {
    //store a tweet
    console.log('adding tweet ' + tweet.id_str);
    var key = 'quote:' + tweet.id_str;
    redisClient.set(key, JSON.stringify(tweet));
    this.addToLatest(key);
  };
  this.addStar = function(id) {
    //add a star to tweet (id)
    redisClient.zincrby(starredKey, 1, id);
  };

  this.getQuotes = function(quoteIds, callback) {
    redisClient.mget(quoteIds, function(err, reply) {
        var quotes = [];
        for (var i in reply) {
          quotes.push(JSON.parse(reply[i]));
        }
        callback(quotes);
    });
  }

  this._update = function() {
    var that = this;
    console.log('running update');

    this.getLatest(1, function(latestTweet) {
      var params = {
        lang: 'en',
        rpp: 100,
      };
      console.log(latestTweet);
      if (latestTweet && latestTweet.length) {
        params.since_id = latestTweet[0].id_str;
      }

      twitterClient.search(QUERY_STRING, params, function(data) {
        if (data.message) {
          console.error(data.message);
        }
        console.log(data.max_id_str);
        for (var i in data['results']) {
          that.addQuote(data['results'][i]);
        }
      });
    });
  };
};
