import User from './user.js'
import Chat from './chat.js'
import Message from './message.js'

User.hasMany(Chat)
Chat.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

Chat.hasMany(Message)
Message.belongsTo(Chat)

export { User, Chat, Message }
