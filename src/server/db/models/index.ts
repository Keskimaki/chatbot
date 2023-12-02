import User from './user'
import Chat from './chat'
import Message from './message'

User.hasMany(Chat)
Chat.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

Chat.hasMany(Message)
Message.belongsTo(Chat)

export { User, Chat, Message }
