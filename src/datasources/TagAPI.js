const { DataSource } = require('apollo-datasource');
const { Op } = require("sequelize");

class TagAPI extends DataSource {
    constructor(models) { // todo VERIFICA PERCHÈ VIENE CHIAMATO SPESSO
        super();
        this.models = models;
        //console.log('constructor TagAPI');
    }

    initialize(config) {
        //console.log('initialize TagAPI data source');
        this.context = config.context;
    }

    async findTags({ prefix, offset, count }) {
        //console.log({ prefix, offset, count });
        let tags = await this.models.tag.findAll({
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

    async findById({ id }) {
        return await this.models.tag.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }
}

module.exports = TagAPI;
