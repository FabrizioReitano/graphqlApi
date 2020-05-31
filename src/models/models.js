const Sequelize = require("sequelize");

const db = {};

db.connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,
    logging: console.log,
    pool: {
        max: parseInt(process.env.DB_POOL_MAX),
        min: parseInt(process.env.BD_POOL_MIN),
        acquire: parseInt(process.env.DB_CONN_MAX_ACQUIRE),
        idle: parseInt(process.env.DB_CONN_MAX_IDLE_TIME)
    }
});

db.models = {};
db.models.tag = require('./tag')(db.connection, Sequelize);
db.models.service = require('./service')(db.connection, Sequelize);

module.exports = db;
