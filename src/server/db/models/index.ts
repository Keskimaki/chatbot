import User from './user'
import Chat from './chat'
import Message from './message'

User.hasMany(Chat, { as: 'chats' })
Chat.belongsTo(User, { as: 'user' })

User.hasMany(Message, { as: 'messages' })
Message.belongsTo(User, { as: 'user' })

Chat.hasMany(Message, { as: 'messages' })
Message.belongsTo(Chat, { as: 'chat' })

export { User, Chat, Message }
