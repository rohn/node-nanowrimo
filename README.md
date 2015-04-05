![NaNoWriMo](http://d3bhawflmd1fic.cloudfront.net/assets/crest-bda7b7a6e1b57bb9fb8ce9772b8faafb.png)

Read and update NaNoWriMo status from Node.JS

## Usage

### Install

```
  npm install nanowrimo
```

### NaNoWriMo API values

The API parameters, as found at http://nanowrimo.org/wordcount_api, can be passed in the object. Any parameters not passed will be assigned default (empty) values. Examples:

```javascript

var nnwm = {
  user: 'my_nnwm_username',
  region: 'usa-california-east-bay',
  secretKey: 'abc123',
  wordCount: 123456
}
```

## Examples

### Retrieving word count

```javascript
var nnwm = require('nanowrimo');

var n = new nnwm({
  user: 'my_nnwm_username'
});

n.getCount(function(err, count) {
  if (err) {
    console.log('error:', err);
  } else {
    console.log('count:', count);
  }
});
```

## Available APIs

The following APIs are available, more info is available on the NaNoWriMo API page.

API | Description
---- | ------------
getCount() | Current individual word count
getCountHistory() | Individual word count history
getSiteCount() | Site word count
getSiteCountHistory() | Site word count history
getRegionCount() | Regional word count
getRegionCountHistory() | Regional word count history
updateCount() | Update individual word count

