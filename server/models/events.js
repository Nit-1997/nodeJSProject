'use strict';
module.exports = (sequelize, Sequelize) => {
  var eventSchema = sequelize.define('events', {
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
    pubId: {
      type: Sequelize.UUID,
      references: {
        model: 'pubs',
        key: 'id'
      },
      allowNull: false
    },
    eventName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    eventDate:{
     allowNull: false,
      type: Sequelize.DATE
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
  }, {});
  eventSchema.associate = function (models) {
    eventSchema.belongsTo(models.user, { foreignKey: 'userId', targetKey: 'id'});
    eventSchema.belongsTo(models.pub, { foreignKey: 'pubId', targetKey: 'id'});
  };
  return eventSchema;
};