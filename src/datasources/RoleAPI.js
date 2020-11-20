const { DataSource } = require('apollo-datasource');
const { Op, Sequelize } = require("sequelize");

class RoleAPI extends DataSource {
    constructor(models) {
        super();
        this.models = models;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findAll() {
        return this.models.role.findAll();
    }
}

module.exports = RoleAPI;
