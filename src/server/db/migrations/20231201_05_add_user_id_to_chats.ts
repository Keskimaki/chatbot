import { DataTypes } from 'sequelize'

import { Migration } from '../connection'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('chats', 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('chats', 'user_id')
}
