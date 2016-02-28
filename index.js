var ping = require('net-ping');
var _ = require('lodash');
var sessionId = 0;

var standardDeviation = function(values) {
  var average = _.mean(values);
  var squareDiffs = _.map(values, function(value) {
    return Math.pow(value - average, 2);
  });
  return Math.sqrt(_.mean(squareDiffs));
};

var unlostPings = function(values) {
  return _.filter(values, function(value) {
    return value !== null;
  });
};

var pingAverage = function(values) {
  var values = unlostPings(values);
  if (values.length === 0) {
    return 0;
  }
	return _.mean(values);
};

var pingPacketLossPercent = function(values) {
  if (values.length === 0) {
    return 0;
  }
  var lostPacketsCount = values.length - unlostPings(values).length;
  var lossPercent = lostPacketsCount / values.length * 100;
  return lossPercent;
};

var pingStandardDeviation = function(values) {
  var values = unlostPings(values);
  if (values.length === 0) {
    return 0;
  }
  return standardDeviation(values);
};

var pingHealth = function(options, cb) {
  sessionId += 1;
  var interval = options.interval || 1000;
  var numIntervals = options.numIntervals || 30;
  var timeout = Math.min(interval, options.timeout || 500);
  var session = ping.createSession({timeout: timeout, sessionId: sessionId});
  var pingValues = [];

  var run = function() {
    var timeStart = new Date().getTime();
    session.pingHost(options.ip, function(err, target, sent, rcvd) {
      var pingValue = rcvd - sent;
      if(err) {
        pingValues.push(null);
      }
      else {
        pingValues.push(pingValue);
      }
      if (pingValues.length > numIntervals) {
        pingValues.shift();
      }
      cb({
        ping: pingValue,
        average: pingAverage(pingValues),
        loss: pingPacketLossPercent(pingValues),
        standardDeviation: pingStandardDeviation(pingValues)
      });
      var nextRunIn = interval - (new Date().getTime() - timeStart);
      if (nextRunIn <= 0) {
        run();
      }
      else {
        setTimeout(run, interval);
      }
    });
  };
  run();
};

module.exports = pingHealth;
