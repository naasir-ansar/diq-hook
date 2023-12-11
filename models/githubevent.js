'use strict';
const {
  Model
} = require('sequelize');
// models/GitHubEvent.js

module.exports = (sequelize, DataTypes) => {
  const GitHubEvent = sequelize.define('GitHubEvent', {
    repository: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sender: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    payloadData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });

  return GitHubEvent;
};
