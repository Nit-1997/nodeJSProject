'use strict';
module.exports = (sequelize, Sequelize) => {
  var ingredientSchema = sequelize.define('ingredient', {
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
  }, {});
  return ingredientSchema;
};