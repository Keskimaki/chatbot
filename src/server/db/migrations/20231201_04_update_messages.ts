import { DataTypes } from 'sequelize'

import { Migration } from '../connection'

const roles = ['system', 'assistant', 'user']

export const up: Migration = async ({ context: queryInterface }) => {
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

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('messages', 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
  })
  await queryInterface.removeColumn('messages', 'model')
  await queryInterface.removeColumn('messages', 'role')
}
