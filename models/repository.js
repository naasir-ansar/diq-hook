// models/repository.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Repository = sequelize.define('Repository', {
    id: {
      type: DataTypes.BIGINT, // Ensure DataTypes is correctly imported from sequelize
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
    // Add other fields as needed
  });

  return Repository;
};
