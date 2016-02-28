# ping-metrics

Ping an IP address and get rolling metrics such as average ping, ping standard deviation, and packet loss %.

Example usage:

```javascript
var pingMetrics = require('ping-metrics');
var google = "8.8.8.8";

pingMetrics({ip: google, interval: 1000}, function(details) {
  console.log([
    "Current Ping: " + details.ping,
    "Avg: " + details.average,
    "Stdev: " + details.standardDeviation,
    "Packet loss: " + details.loss + "%"
  ].join(" "));
});
```
