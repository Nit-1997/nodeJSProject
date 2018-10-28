'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('events', {
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
     eventDate:{
     allowNull: false,
      type: Sequelize.DATE
    },
    eventName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    about: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    eventContact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('events');
  }
};

