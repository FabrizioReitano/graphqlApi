const Sequelize = require("sequelize");

let _client;

function init() {
    console.log('db init');
    return new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: false,
        pool: {
            max: process.env.DB_POOL_MAX,
            min: process.env.BD_POOL_MIN,
            acquire: process.env.DB_CONN_MAX_ACQUIRE,
            idle: process.env.DB_CONN_MAX_IDLE_TIME
        }
    });
}

function getClient() {
    if (!_client) _client = init();
    return _client;
}

module.exports = {
    getClient: getClient
}
