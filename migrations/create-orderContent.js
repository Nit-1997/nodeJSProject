'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orderContents', {
     id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
     type: Sequelize.INTEGER,
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
});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('orderContents');
  }
};
