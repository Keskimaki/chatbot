const { DataTypes } = require('sequelize')

const up = ({ context: queryInterface }) =>
  queryInterface.createTable('messages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    chat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chats',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })

const down = ({ context: queryInterface }) =>
  queryInterface.dropTable('messages')

module.exports = { up, down }
