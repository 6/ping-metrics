# ping-metrics

Ping an IP address and get rolling metrics such as:

- average ping
- ping standard deviation
- packet loss %

Example usage:

```javascript
var pingMetrics = require('ping-metrics');

// Get rolling 60 second metrics on Google DNS ping.
var google = "8.8.8.8";
pingMetrics({ip: google, interval: 1000, numIntervals: 60}, function(details) {
  console.log([
    "Current Ping: " + details.ping,
    "Avg: " + details.average,
    "Stdev: " + details.standardDeviation,
    "Packet loss: " + details.loss + "%"
  ].join(" "));
});
```
