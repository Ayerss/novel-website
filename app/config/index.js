exports.redis = {
  port: 6379,
  host: process.env.REDIS_HOST,
  pwd: process.env.REDIS_PWD,
};

exports.socket = {
  port: 8081
}

exports.origin = require(global.prefixPath + '/config/origin');
