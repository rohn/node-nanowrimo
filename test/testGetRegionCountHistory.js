var nnwm = require('../lib/nanowrimo');

var validRegion = 'usa-california-east-bay';
var failingRegion = 'mars';

var n = new nnwm({
  region: failingRegion
});

n.getRegionCountHistory(function(err, count) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('count:', count);
  }
});
