const { DataTypes } = require('sequelize')

const up = ({ context: queryInterface }) =>
  queryInterface.createTable('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
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
  queryInterface.dropTable('users')

module.exports = { up, down }
