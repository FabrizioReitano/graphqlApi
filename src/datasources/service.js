const { DataSource } = require('apollo-datasource');
const { Op, Sequelize } = require("sequelize");

class ServiceAPI extends DataSource {
    constructor(model) { // todo VERIFICA PERCHÈ VIENE CHIAMATO SPESSO
        super();
        this.model = model;
        //console.log('constructor TagAPI');
    }

    initialize(config) {
        //console.log('initialize TagAPI data source');
        this.context = config.context;
    }

    async findServices({ category, center, radius, offset, count }) {
        //console.log({ prefix, offset, count });
        //let location = sequelize.fn('ST_GeomFromText', 'POINT('+center.lat+' '+center.lon+')', '4326');
        console.log({ category, center, radius, offset, count });
        let services = await this.model.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn(
                            'ST_Distance',
                            Sequelize.col('geog'),
                            Sequelize.fn('ST_SetSRID', Sequelize.fn('ST_MakePoint', center.lat, center.lon), '4326'),
                        ),
                        'distance'
                    ]
                ]
            },
            where: Sequelize.where(
                Sequelize.fn(
                    'ST_DWithin',
                    Sequelize.col('geog'),
                    Sequelize.fn('ST_SetSRID', Sequelize.fn('ST_MakePoint', center.lat, center.lon), '4326'),
                    radius
                ),
                true
            ),
            order: Sequelize.literal('distance ASC'),
            offset: offset,
            limit: count
        });
        return services;
    }
}

module.exports = ServiceAPI;
