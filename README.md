# ping-metrics

Ping an IP address and get rolling metrics such as:

- average ping
- ping standard deviation
- packet loss %

Example usage:

```javascript
var pingMetrics = require('ping-metrics');
var options = {
  ip: "8.8.8.8",   // IP address to ping
  interval: 1000,  // interval at which to ping (milliseconds)
  numIntervals: 60 // number of intervals that the rolling window should last
};
var ping = pingMetrics(options, function(metrics) {
  console.log([
    "Current Ping: " + metrics.ping,
    "Avg: " + metrics.average,
    "Stdev: " + metrics.standardDeviation,
    "Packet loss: " + metrics.loss + "%"
  ].join(" "));
});
ping.run();

// You can also stop and resume:
ping.stop();
ping.run();
```
