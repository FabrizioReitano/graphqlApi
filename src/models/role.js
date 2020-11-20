module.exports = (sequelize, type) => {
    return sequelize.define('Role', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: type.DATE,
        created_by: type.INTEGER,
        updated_at: type.DATE,
        updated_by: type.INTEGER,
        deleted_at: type.DATE,
        name: type.STRING(20)
    },{
        tableName: 'roles',
        underscored: true,
        paranoid: true
    })
}
