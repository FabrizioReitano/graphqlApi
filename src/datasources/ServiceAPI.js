const { DataSource } = require('apollo-datasource');
const { Op, Sequelize } = require("sequelize");

class ServiceAPI extends DataSource {
    constructor(models) { // todo VERIFICA PERCHÈ VIENE CHIAMATO SPESSO
        super();
        this.models = models;
        //console.log('constructor TagAPI');
    }

    initialize(config) {
        //console.log('initialize TagAPI data source');
        this.context = config.context;
    }

    async findBySlug({ slug }) {
        return this.models.service.findOne({
            where: { slug: slug },
            include: [{
                model: this.models.tag,
                as: 'tags'
            }]
        });
    }

    async findServices({ category, center, radius, offset, count }) {
        let location = Sequelize.fn('ST_SetSRID', Sequelize.fn('ST_MakePoint', center.lat, center.lon), '4326');
        //console.log({ category, center, radius, offset, count });
        let services = await this.models.service.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn(
                            'ST_Distance',
                            Sequelize.col('geog'),
                            location,
                        ),
                        'distance'
                    ]
                ]
            },
            where: Sequelize.where(
                Sequelize.fn(
                    'ST_DWithin',
                    Sequelize.col('geog'),
                    location,
                    radius
                ),
                true
            ),
            order: Sequelize.literal('distance ASC'),
            offset: offset,
            limit: count,
            include: [{
                model: this.models.tag,
                as: 'tags'
            }]
        });
        return services;
    }
}

module.exports = ServiceAPI;
