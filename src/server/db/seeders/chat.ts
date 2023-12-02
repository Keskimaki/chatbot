import { adminId } from './user.js'
import { Chat, Message } from '../models/index.js'

const devChat = {
  id: 'c9b00544-9061-11ee-b9d1-0242ac120002',
  userId: adminId,
  name: 'Development conversation',
}

const messages = [
  {
    id: '5f2d4a64-9062-11ee-b9d1-0242ac120002',
    chatId: devChat.id,
    content: 'This is a test.',
    role: 'system' as const,
  },
  {
    id: '7d3f69cc-9064-11ee-b9d1-0242ac120002',
    userId: adminId,
    chatId: devChat.id,
    content: 'Say this is a test.',
    role: 'user' as const,
  },
  {
    id: 'c2bed528-9064-11ee-b9d1-0242ac120002',
    chatId: devChat.id,
    content: 'This is a test.',
    role: 'assistant' as const,
    model: 'gpt-3.5-turbo',
  },
]

const seedChats = async () => {
  await Chat.upsert({ ...devChat })

  for (const message of messages) {
    await Message.upsert({ ...message })
  }
}

export default seedChats
