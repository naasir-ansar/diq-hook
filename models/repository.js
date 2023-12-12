const {
    Model
  } = require('sequelize');
const sequelize = require('../db');
// models/Repository.js
module.exports = (sequelize, DataTypes) => {
    const Repository = sequelize.define('Repository', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Repository;
  };
  