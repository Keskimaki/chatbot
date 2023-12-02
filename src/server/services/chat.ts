import { Chat, Message } from '../db/models/index'

type ChatWithMessages = Chat & {
  messages: Message[]
}

export const getUserChats = async (userId: string) => {
  const chats = (await Chat.findAll({
    attributes: ['id', 'name'],
    where: { userId },
    include: [
      {
        model: Message,
        as: 'messages',
        attributes: ['id'],
      },
    ],
  })) as ChatWithMessages[]

  const chatsWithMessageCounts = chats.map((chat) => ({
    ...chat.toJSON(),
    messageCount: chat.messages.length,
  }))

  return chatsWithMessageCounts
}

export const getChatAndMessages = async (chatId: string) => {
  const chat = await Chat.findByPk(chatId, {
    attributes: ['id', 'name'],
    include: [
      {
        model: Message,
        as: 'messages',
        attributes: ['id', 'userId', 'content', 'role', 'model'],
        where: { chatId },
      },
    ],
  })

  return chat
}

export const newChat = async (userId: string, name: string) => {
  const chat = await Chat.create({ userId, name })

  return chat
}
