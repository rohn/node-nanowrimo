var nnwm = require('../lib/nanowrimo');

var n = new nnwm();

n.getSiteCount(function(err, count) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('count:', count);
  }
});
