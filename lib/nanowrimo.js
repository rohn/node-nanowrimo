var http = require('http');
var url = require('url');
var parser = require('xml2json');
var crypto = require('crypto');
var querystring = require('querystring');



function readFromWeb(surl, result) {
  var data = '';
  var value;
  var req = http.get(url.parse(surl), function(res) {
    res.on('data', function(chunk) {
      data += chunk.toString();
    });
    res.on('end', function() {
      value = parser.toJson(data, {object:true});
      result(null, value);
    });
  });
}

function sha1sum(input) {
  return crypto.createHash('sha1').update(input.toString()).digest('hex');
}

function setDefaults(o) {
  o = o || {}; // should never be falsey
  var def = ['user', 'region', 'secretKey', 'wordCount'];
  var i = 0;
  var l = def.length;
  for (; i < l; i++) {
    if (!o[def[i]]) {
      o[def[i]] = '';
    }
  }
  return o;
}

function Nanowrimo(opts) {
  opts = setDefaults(opts);
  this.user      = opts.user;
  this.region    = opts.region;
  this.secretKey = opts.secretKey;
  this.wordCount = opts.wordCount;
}

Nanowrimo.prototype.getCount = function(result) {
  var surl = 'http://nanowrimo.org/wordcount_api/wc/' + this.user;
  readFromWeb(surl, function(err, moo) {
    if (moo.wc.error) {
      result(new Error(moo.wc.error));
    } else {
      result(null, moo.wc.user_wordcount);
    }
  });
}

Nanowrimo.prototype.getCountHistory = function(result) {
  var surl = 'http://nanowrimo.org/wordcount_api/wchistory/' + this.user;
  readFromWeb(surl, function(err, moo) {
    if (moo.wchistory.error) {
      result(new Error(moo.wchistory.error));
    } else {
      result(null, moo.wchistory.wordcounts.wcentry);
    }
  });
}

Nanowrimo.prototype.getSiteCount = function(result) {
  var surl = 'http://nanowrimo.org/wordcount_api/wcstatssummary';
  readFromWeb(surl, function(err, moo) {
    result(null, moo.wcstatssummary);
  });
}

Nanowrimo.prototype.getSiteCountHistory = function(result) {
  var surl = 'http://nanowrimo.org/wordcount_api/wcstats';
  readFromWeb(surl, function(err, moo) {
    result(null, moo.wcstats);
  });
}

Nanowrimo.prototype.getRegionCount = function(result) {
  var surl = 'http://nanowrimo.org/wordcount_api/wcregion/' + this.region;
  readFromWeb(surl, function(err, moo) {
    if (moo.wcregion.error) {
      result(new Error(moo.wcregion.error));
    } else {
      result(null, moo.wcregion);
    }
  });
}

Nanowrimo.prototype.getRegionCountHistory = function(result) {
  var surl = 'http://nanowrimo.org/wordcount_api/wcregionhist/' + this.region;
  readFromWeb(surl, function(err, moo) {
    if (moo.wcregion.error) {
      result(new Error(moo.wcregion.error));
    } else {
      result(null, moo.wcregion);
    }
  });
}

Nanowrimo.prototype.updateCount = function(result) {
  var surl = 'http://nanowrimo.org/api/wordcount';
  var hashable = this.secretKey + this.user + this.wordCount.toString();

  var post_data = querystring.stringify({
    hash: sha1sum(hashable),
    name: this.user,
    wordcount: this.wordCount
  });

  var post_options = {
    host: 'nanowrimo.org',
    port: '80',
    path: '/api/wordcount',
    method: 'PUT',
    headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
      }
  };
  console.log(post_data);

  var post_req = http.request(post_options, function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      data += chunk.toString();
    });
    res.on('end', function() {
      result(null, data);
    });
  });
  post_req.write(post_data);
  post_req.end();

}


exports = module.exports = Nanowrimo;