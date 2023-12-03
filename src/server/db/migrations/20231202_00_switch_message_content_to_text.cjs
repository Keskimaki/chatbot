const { DataTypes } = require('sequelize')

const up = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('messages', 'content', {
    type: DataTypes.TEXT,
    allowNull: false,
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('messages', 'content', {
    type: DataTypes.STRING,
    allowNull: false,
  })
}

module.exports = { up, down }
