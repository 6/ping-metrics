# ping-metrics

Ping an IP address and get rolling metrics such as average ping, ping standard deviation, and packet loss %.

Example usage:

```javascript
var pingMetrics = require('ping-metrics');
var google = "8.8.8.8";

pingMetrics({ip: google, interval: 1000}, function(details) {
  console.log([
    "Google DNS Ping: " + Math.round(details.ping),
    "Avg: " + Math.round(details.average),
    "Stdev: " + Math.round(details.standardDeviation),
    "Packet loss: " + Math.round(details.loss) + "%"
  ].join(" "));
});
```
