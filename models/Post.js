const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    /*
    isComment() {
        return this.post_id;
    }*/    
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        date_created: {
            type: DataTypes.DATE,
            allownull: false,
            defaultValue: DataTypes.NOW,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        /*
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: true, 
            reference:{
                model: 'post',
                key: 'id',
            }
        },*/
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);
 module.exports = Post;