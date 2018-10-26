'use strict';
module.exports = (sequelize, Sequelize) => {
  var commentSchema = sequelize.define('comment', {
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
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  commentSchema.associate = function (models) {
    commentSchema.belongsTo(models.user, { foreignKey: 'userId', targetKey: 'id'});
    commentSchema.belongsTo(models.pub, { foreignKey: 'pubId', targetKey: 'id'});
  };
  return commentSchema;
};