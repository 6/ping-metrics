var ping = require('net-ping');
var _ = require('lodash');
var session = ping.createSession({timeout: 1000});
var interval;
var ip;
var numIntervals;
var pingValues = [];

var standardDeviation = function(values) {
  var average = _.mean(values);
  var squareDiffs = _.map(values, function(value) {
    return Math.pow(value - average, 2);
  });
  return Math.sqrt(_.mean(squareDiffs));
};

var getPing = function(ip, cb) {
	session.pingHost(ip, function(err, target, sent, rcvd) {
		if(err) {
      return cb(null);
    }
    else {
      cb(rcvd - sent);
    }
	});
};

var unlostPings = function() {
  return _.filter(pingValues, function(value) {
    return value !== null;
  });
};

var pingAverage = function() {
  var values = unlostPings();
  if (values.length === 0) {
    return 0;
  }
	return _.mean(values);
};

var pingPacketLossPercent = function() {
  if (pingValues.length === 0) {
    return 0;
  }
  var lostPacketsCount = pingValues.length - unlostPings().length;
  var lossPercent = lostPacketsCount / pingValues.length * 100;
  return lossPercent;
};

var pingStandardDeviation = function() {
  var values = unlostPings();
  if (values.length === 0) {
    return 0;
  }
  return standardDeviation(values);
};

var run = function(options) {
  var timeStart = new Date().getTime();
  ip = options.ip;
  interval = options.interval || 1000;
  numIntervals = options.numIntervals || 60;

  getPing(ip, function(pingValue) {
    pingValues.push(pingValue);
    if (pingValues.length > numIntervals) {
      pingValues.shift();
    }
    console.log(pingValue);
    console.log("AVG", Math.round(pingAverage()));
    console.log("LOSS", Math.round(pingPacketLossPercent()));
    console.log("STDEV", Math.round(pingStandardDeviation()));

    var timeEnd = new Date().getTime();
    var nextRunIn = interval - (timeEnd - timeStart);
    if (nextRunIn <= 0) {
      run(options);
    }
    else {
      setTimeout(function() {
        run(options);
      }, nextRunIn);
    }
  });
};

run({ip: "185.40.65.1", interval: 1000});
