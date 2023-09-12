const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../server/config/db');

const Tenders = sequelize.define('Tenders', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  user_id: DataTypes.STRING,
  submission_deadline: DataTypes.TEXT,
  requirements: DataTypes.TEXT,
  is_published: DataTypes.BOOLEAN,
  attachments: DataTypes.TEXT,
  title: DataTypes.STRING,
});

module.exports = Tenders;

