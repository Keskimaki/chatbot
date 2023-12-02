import { Chat, Message } from '../db/models/index'
import { sortByCreatedAt } from '../util/util'

type MessageWithCreatedAt = Message & {
  createdAt: string
}

type ChatWithMessages = Chat & {
  messages: MessageWithCreatedAt[]
  createdAt: string
}

export const getUserChats = async (userId: string) => {
  const chats = (await Chat.findAll({
    attributes: ['id', 'name', 'createdAt'],
    where: { userId },
    include: [
      {
        model: Message,
        as: 'messages',
        attributes: ['id'],
      },
    ],
  })) as ChatWithMessages[]

  chats.sort(sortByCreatedAt)

  const chatsWithMessageCounts = chats.map((chat) => ({
    ...chat.toJSON(),
    messageCount: chat.messages.length,
  }))

  return chatsWithMessageCounts
}

export const getChatAndMessages = async (chatId: string) => {
  const chat = (await Chat.findByPk(chatId, {
    attributes: ['id', 'userId', 'name'],
    include: [
      {
        model: Message,
        as: 'messages',
        attributes: ['id', 'content', 'role', 'model', 'createdAt'],
        where: { chatId },
        required: false,
      },
    ],
  })) as ChatWithMessages

  chat.messages.sort(sortByCreatedAt).reverse()

  return chat
}

export const newChat = async (userId: string, name: string) => {
  const chat = await Chat.create({ userId, name })

  return chat
}

export const updateChatTitle = async (chatId: string, name: string) => {
  const chat = await Chat.findByPk(chatId)

  if (!chat) return null

  chat.name = name
  await chat.save()

  return chat
}
