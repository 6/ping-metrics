// Example usage. Run with `node example.js`

var pingMetrics = require('./index');

pingMetrics({ip: "104.160.131.1", interval: 1000}, function(details) {
  console.log([
    "NA Ping: " + Math.round(details.ping),
    "Avg: " + Math.round(details.average),
    "Stdev: " + Math.round(details.standardDeviation),
    "Loss: " + Math.round(details.loss) + "%"
  ].join(" "));
});

pingMetrics({ip: "185.40.65.1", interval: 3000}, function(details) {
  console.log([
    "EUW Ping: " + Math.round(details.ping),
    "Avg: " + Math.round(details.average),
    "Stdev: " + Math.round(details.standardDeviation),
    "Loss: " + Math.round(details.loss) + "%"
  ].join(" "));
});
