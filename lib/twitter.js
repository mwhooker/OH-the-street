var redis = require('redis');

var redisClient = redis.createClient(6379, 'localhost');

exports.twitter = function(client) {
  var twitterClient = client;
  var QUERY_STRING = 'OH OR #OH';
  var latestKey = 'latestIdx';
  var starredKey = 'starredIdx';

  this.getLatest = function(n, callback) {
    //get latest n tweets
    redisClient.lrange(latestKey, 0, n, function(err, reply) {
      redisClient.mget(reply, function(err, reply) {
        callback(reply);
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

  this.addTweet = function(tweet) {
    //store a tweet
    console.log('adding tweet');
    var key = 'quote:' + tweet['id_str'];
    redisClient.set(key, JSON.stringify(tweet));
    this.addToLatest(key);
  };
  this.addStar = function(id) {
    //add a star to tweet (id)
    redisClient.zincrby(starredKey, 1, id);
  };

  this._update = function() {
    var that = this;
    this.getLatest(1, function(reply) {
      console.log('running update');

      twitterClient.search(QUERY_STRING, function(data) {
        for (var i in data['results']) {
          that.addTweet(data['results'][i]);
        }
      });
    });
  };
};
