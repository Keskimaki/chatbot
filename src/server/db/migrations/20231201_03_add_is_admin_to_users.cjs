const { DataTypes } = require('sequelize')

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'is_admin', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'is_admin')
}

module.exports = { up, down }
