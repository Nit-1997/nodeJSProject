'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
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
  });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('orders');
  }
};