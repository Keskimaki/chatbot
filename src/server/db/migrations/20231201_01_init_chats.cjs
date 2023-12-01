const { DataTypes } = require('sequelize')

const up = ({ context: queryInterface }) =>
  queryInterface.createTable('chats', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
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
  queryInterface.dropTable('chats')

module.exports = { up, down }
