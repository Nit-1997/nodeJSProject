'use strict';
module.exports = (sequelize, Sequelize) => {
  var orderContentSchema = sequelize.define('orderContent', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    orderId: {
      type: Sequelize.UUID,
      references: {
        model: 'orders',
        key: 'id'
      },
      allowNull: false
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
  orderContentSchema.associate = function (models) {
    orderContentSchema.belongsTo(models.order, { foreignKey: 'orderId', targetKey: 'id'});
  };
  return orderContentSchema;
};