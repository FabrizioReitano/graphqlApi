const { DataSource } = require('apollo-datasource');
const { Op } = require("sequelize");

class TagAPI extends DataSource {
    constructor(model) { // todo VERIFICA PERCHÈ VIENE CHIAMATO SPESSO
        super();
        this.model = model;
        //console.log('constructor TagAPI');
    }

    initialize(config) {
        //console.log('initialize TagAPI data source');
        this.context = config.context;
    }

    async findTags({ prefix, offset, count }) {
        //console.log({ prefix, offset, count });
        let tags = await this.model.findAll({
            where: {
                name: {
                    [Op.like]: prefix+'%'
                }
            },
            offset: offset,
            limit: count
        });
        return tags;
    }
}

module.exports = TagAPI;
