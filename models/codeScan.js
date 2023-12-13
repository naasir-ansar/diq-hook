'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize, DataTypes) => {
  const CodeScan = sequelize.define('CodeScan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fixed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repository: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    commit_oid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return CodeScan;
};
