'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize, DataTypes) => {
  const Release = sequelize.define('Release', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    Url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Repository: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Release;
};
