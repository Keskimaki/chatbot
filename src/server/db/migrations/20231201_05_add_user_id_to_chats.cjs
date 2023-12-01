const { DataTypes } = require('sequelize')

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('chats', 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('chats', 'user_id')
}

module.exports = { up, down }
