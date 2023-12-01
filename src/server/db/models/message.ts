import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

import { sequelize } from '../connection.js'

class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<string>
  declare userId: string
  declare chatId: string
  declare text: string
  declare model: string
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize,
  }
)

export default Message
