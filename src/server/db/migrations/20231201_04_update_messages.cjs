const { DataTypes } = require('sequelize')

const roles = ['system', 'assistant', 'user']

const up = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('messages', 'user_id', {
    type: DataTypes.UUID,
    allowNull: true,
  })
  await queryInterface.addColumn('messages', 'model', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('messages', 'role', {
    type: DataTypes.ENUM(...roles),
    allowNull: false,
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('messages', 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
  })
  await queryInterface.removeColumn('messages', 'model')
  await queryInterface.removeColumn('messages', 'role')
}

module.exports = { up, down }
