var nnwm = require('../lib/nanowrimo');

var n = new nnwm();

n.getSiteCountHistory(function(err, count) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('count:', count);
  }
});
