'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('pubs', {
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
    pubName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lat:{
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    lng:{
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    address: {
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
    pubContact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    fac1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fac2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fac3: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fac4: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fac5: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('pubs');
  }
};

