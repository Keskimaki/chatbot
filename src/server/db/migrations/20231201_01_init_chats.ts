import { DataTypes } from 'sequelize'

import { Migration } from '../connection'

export const up: Migration = ({ context: queryInterface }) =>
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

export const down: Migration = ({ context: queryInterface }) =>
  queryInterface.dropTable('chats')
