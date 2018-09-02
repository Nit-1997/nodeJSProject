'use strict';
module.exports = (sequelize, Sequelize) => {
  var orderSchema = sequelize.define('order', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pincode: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    order:{
      type: Sequelize.STRING,
      allowNull:false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    deliveryMethod:{
      type:Sequelize.STRING,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  orderSchema.associate = function (models) {
    orderSchema.belongsTo(models.user, { foreignKey: 'userId', targetKey: 'id'});
  };
  return orderSchema;
};