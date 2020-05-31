module.exports = (sequelize, type) => {
    return sequelize.define('Tag', {
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
        name: type.STRING(100)
    },{
        tableName: 'tags',
        timestamps: false
    })
}
