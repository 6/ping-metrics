// Example usage. Run with `node example.js`

var pingHealth = require('./index');

pingHealth({ip: "185.40.65.1", interval: 1000}, function(details) {
  console.log([
    "Ping: " + Math.round(details.ping),
    "Avg: " + Math.round(details.average),
    "Stdev: " + Math.round(details.standardDeviation),
    "Loss: " + Math.round(details.loss) + "%"
  ].join(" "));
});
