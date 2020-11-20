module.exports = (sequelize, type) => {
    return sequelize.define('User', {
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
        name: type.STRING(50),
        surname: type.STRING(50),
        email: type.STRING(100)
    },{
        tableName: 'users',
        underscored: true,
        paranoid: true
    })
}
