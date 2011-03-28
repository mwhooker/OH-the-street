

exports.twitter = function(client) {
  this.client = client;
  this.QUERY_STRING = 'OH OR #OH';

  this.getLatest = function(n, callback) {
    //get latest n tweets
  };
  this.getRandom = function(n, callback) {
    //get n random tweets
  }
  this.getTopStarred = function(n, callback) {
    //get n most starred tweets
  }

  this.addTweet = function(tweet) {
    //store a tweet
  }
  this.star = function(id) {
    //add a star to tweet (id)
  }

  this._update = function() {
    var latest = this.getLatest(1);
  }

  this.client.search(this.QUERY_STRING, function(data) {
    for (i in data['results']) {
      this.addTweet(data['results'][i]);
    }
  }
};

