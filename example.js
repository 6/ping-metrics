// Example usage. Run with `node example.js`

var pingMetrics = require('./index');

pingMetrics({ip: "104.160.131.1", interval: 1000}, function(metrics) {
  console.log([
    "NA Ping: " + Math.round(metrics.ping),
    "Avg: " + Math.round(metrics.average),
    "Stdev: " + Math.round(metrics.standardDeviation),
    "Loss: " + Math.round(metrics.loss) + "%"
  ].join(" "));
});

pingMetrics({ip: "185.40.65.1", interval: 3000}, function(metrics) {
  console.log([
    "EUW Ping: " + Math.round(metrics.ping),
    "Avg: " + Math.round(metrics.average),
    "Stdev: " + Math.round(metrics.standardDeviation),
    "Loss: " + Math.round(metrics.loss) + "%"
  ].join(" "));
});
