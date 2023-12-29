import { Message } from '../db/models'

export const saveSystemMessage = async (
  userId: string,
  chatId: string,
  content: string
) => {
  const savedMessage = await Message.create({
    userId,
    chatId,
    content,
    role: 'system',
  })

  return savedMessage
}

export const saveUserMessage = async (
  userId: string,
  chatId: string,
  content: string
) => {
  const savedMessage = await Message.create({
    userId,
    chatId,
    content,
    role: 'user',
  })

  return savedMessage
}

export const saveAssistantMessage = async (
  userId: string,
  chatId: string,
  model: string,
  content: string
) => {
  const savedMessage = await Message.create({
    userId,
    chatId,
    model,
    content,
    role: 'assistant',
  })

  return savedMessage
}

export const saveNewMessages = async (
  chatId: string,
  userId: string,
  system: string,
  messages: any[],
  model: string,
  completion: string
) => {
  const newMessage = messages.at(-1) as Message

  if (messages.length === 1) await saveSystemMessage(userId, chatId, system)
  await saveUserMessage(userId, chatId, newMessage.content)
  await saveAssistantMessage(userId, chatId, model, completion)
}
