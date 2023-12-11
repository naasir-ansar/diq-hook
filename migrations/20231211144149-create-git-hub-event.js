'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GitHubEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // Add new columns to the GitHubEvents table
    await queryInterface.addColumn('GitHubEvents', 'repository', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
    await queryInterface.addColumn('GitHubEvents', 'sender', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
    await queryInterface.addColumn('GitHubEvents', 'payloadData', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GitHubEvents');
  }
};