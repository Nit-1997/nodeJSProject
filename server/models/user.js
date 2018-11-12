'use strict';
module.exports =  (sequelize, Sequelize) => {
  var userSchema = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mode:{
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    contact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {});
  userSchema.associate= function (models) {
    userSchema.hasMany(models.pub);
    userSchema.hasMany(models.comment);
    userSchema.hasMany(models.events);
    userSchema.hasMany(models.transaction);
  };
  return userSchema;
};
