import { DataTypes } from 'sequelize'

import { Migration } from '../connection'

export const up: Migration = ({ context: queryInterface }) =>
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

export const down: Migration = ({ context: queryInterface }) =>
  queryInterface.dropTable('messages')
