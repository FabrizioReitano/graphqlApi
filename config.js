var config = {};

config.redis = {};
config.web = {};
config.security = {};

config.persistence_type = 'redis';
config.web.port = process.env.WEB_PORT || 3000;

config.security.salt = 'NWZn6tpxr6M8BMhu';
config.security.secret = 'bncKk42CLq5beXV1DjpOxddTQLa0FDcp';

config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = '127.0.0.1';
config.redis.port = 6379;
config.redis.options = {};

module.exports = config;
