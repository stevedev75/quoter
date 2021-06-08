const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Post extends Model {
    /*
    isComment() {
        return this.post_id;
    }*/    
}

Post.init(
    {
        id: {
            type: DataTypes.iNTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: Datatypes.DATE,
            allownull: false,
            defaultValue: Datatypes.NOW,
        },
        user_id: {
            type: DataTypes.iNTEGER,
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