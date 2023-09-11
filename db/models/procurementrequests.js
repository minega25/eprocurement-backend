const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../server/config/db');

const ProcurementRequests = sequelize.define('Procurementrequests', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  user_id: DataTypes.STRING,
  items_needed: DataTypes.TEXT,
  quantities: DataTypes.TEXT,
  budget: DataTypes.STRING,
  preferred_vendor: DataTypes.TEXT,
});

module.exports = ProcurementRequests;
