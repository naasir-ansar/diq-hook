'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize, DataTypes) => {
  const PullRequestOpened = sequelize.define('PullRequestOpened', {
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
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    merged_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    closed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    head_branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    review_comments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Commits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    additions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    changed_files: {
      type: DataTypes.INTEGER,
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

  return PullRequestOpened;
};
