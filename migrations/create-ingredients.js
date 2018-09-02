'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ingredients', {
     id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    salad: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    bacon: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    cheese: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    meat: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ingredients');
  }
};