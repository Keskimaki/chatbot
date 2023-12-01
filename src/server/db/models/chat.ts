import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

import { sequelize } from '../connection.js'

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<string>
  declare name: string
  declare userId: string
}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize,
  }
)

export default Chat
