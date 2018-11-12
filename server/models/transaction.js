'use strict';
module.exports = (sequelize, Sequelize) => {
  var transactionSchema = sequelize.define('transaction', {
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
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    paymentId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  transactionSchema.associate = function (models) {
    transactionSchema.belongsTo(models.user, { foreignKey: 'userId', targetKey: 'id'});
  };
  return transactionSchema;
};