const Sequelize = require("sequelize");

const db = {};

db.connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
db.models.role = require('./role')(db.connection, Sequelize);
db.models.user = require('./user')(db.connection, Sequelize);

// relazione service-tag
const service_tag = db.connection.define('service_tag', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    service_id: Sequelize.INTEGER,
    tag_id: Sequelize.INTEGER
},{
    tableName: 'services_tags',
    underscored: true,
    timestamps: false
});
db.models.service.belongsToMany(db.models.tag, {through: service_tag, foreignKey: 'service_id', as: 'tags'});
db.models.tag.belongsToMany(db.models.service, {through: service_tag, foreignKey: 'tag_id'});

// relazione user-role
const user_role = db.connection.define('user_role', {
    user_id: Sequelize.INTEGER,
    role_id: Sequelize.INTEGER
},{
    tableName: 'users_roles',
    underscored: true,
    timestamps: false
});
db.models.user.belongsToMany(db.models.role, {through: user_role, foreignKey: 'user_id', as: 'roles'});
db.models.role.belongsToMany(db.models.user, {through: user_role, foreignKey: 'role_id'});

module.exports = db;
