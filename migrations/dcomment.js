'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
     id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    pubId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'pubs',
        key: 'id'
      },
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
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
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};

