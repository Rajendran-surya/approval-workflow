const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notEmpty: true }
  },
  requestedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'requested_by',
    validate: { notEmpty: true }
  },
  requestType: {
    type: DataTypes.ENUM('LEAVE', 'EXPENSE', 'GENERAL'),
    allowNull: false,
    field: 'request_type'
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    defaultValue: 'PENDING',
    allowNull: false
  }
}, {
  tableName: 'requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Request;