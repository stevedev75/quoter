const { Model, DataTypes } = require('sequelize');

class Likes extends model { }

Likes.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'Likes',
    }
);

module.exports = Likes;