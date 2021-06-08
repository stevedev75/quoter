const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  { 
    id: {
      type: DataTypes.DECIMAL(16),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [16],
    },
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [32],
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [32],
      },
    },

    create_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    post_id1: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      autoIncrement: true,
    },

    comment_id1: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      autoIncrement: true,
    },

  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
