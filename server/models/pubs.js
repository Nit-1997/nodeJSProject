'use strict';
module.exports = (sequelize, Sequelize) => {
  var pubSchema = sequelize.define('pub', {
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
    about:{
      type: Sequelize.STRING,
      allowNull:false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fac1:{
      type: Sequelize.STRING,
      allowNull:false
    },
    fac2:{
      type: Sequelize.STRING,
      allowNull:false
    },
    fac3:{
      type: Sequelize.STRING,
      allowNull:false
    },
    fac4:{
      type: Sequelize.STRING,
      allowNull:false
    },
    fac5:{
      type: Sequelize.STRING,
      allowNull:false
    },
    pubContact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  pubSchema.associate = function (models) {
    pubSchema.belongsTo(models.user, { foreignKey: 'userId', targetKey: 'id'});
  };
  return pubSchema;
};