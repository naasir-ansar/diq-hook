const {
  Model
} = require('sequelize');
const sequelize = require('../db');
// models/Repository.js
module.exports = (sequelize, DataTypes) => {
  const Commit = sequelize.define('Commits', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING, // Change to match your author data type
      allowNull: false,
    },
    added_files_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_files_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    removed_files_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Commit;
};


  