const { DataSource } = require('apollo-datasource');
const { Op, Sequelize } = require("sequelize");

class UserApi extends DataSource {
    constructor(models) {
        super();
        this.models = models;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findAll() {
        return this.models.user.findAll(/*{
            include: [{
                model: this.models.role,
                as: 'roles',
                required: false
            }]
        }*/);
    }
}

module.exports = UserApi;
