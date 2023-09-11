const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../server/config/db');

const User = sequelize.define('Users', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
