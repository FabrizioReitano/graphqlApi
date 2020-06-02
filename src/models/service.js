module.exports = (sequelize, type) => {
    return sequelize.define('Service', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: type.DATE,
        created_by: type.INTEGER,
        updated_at: type.DATE,
        updated_by: type.INTEGER,
        active: type.BOOLEAN,
        name: type.STRING(50),
        slug: type.STRING(100),
        geog: type.GEOGRAPHY('POINT', 4326)
    },{
        tableName: 'services',
        underscored: true,
        paranoid: true
    })
}
