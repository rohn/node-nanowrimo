var nnwm = require('../lib/nanowrimo');

var validUser = 'jezra';
var failingUser = 'jezra88';

var n = new nnwm({
  user: validUser
});

n.getCount(function(err, count) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('count:', count);
  }
});
