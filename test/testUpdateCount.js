var nnwm = require('../lib/nanowrimo');

var validUser = 'annabelle';
var secretKey = 'abc123';
var wordCount = 23000;

var n = new nnwm({
  user: validUser,
  secretKey: secretKey,
  wordCount: wordCount
});

n.updateCount(function(err, resp) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('Response:', resp);
  }
});
