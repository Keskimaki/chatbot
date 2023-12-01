import { Chat, Message } from '../db/models/main.js'

export const getUserChats = async (userId: string) => {
  const chats = await Chat.findAll({
    attributes: ['id', 'name'],
    where: { userId },
  })

  return chats
}

export const getChatAndMessages = async (chatId: string) => {
  console.log('chatId', chatId)
  const chat = await Chat.findByPk(chatId, {
    attributes: ['id', 'name'],
    include: [
      {
        model: Message,
        attributes: ['id', 'content', 'role', 'model'],
        where: { chatId },
      },
    ],
  })

  return chat
}
