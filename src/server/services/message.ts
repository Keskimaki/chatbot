import OpenAI from 'openai'

import { Message as MessageType } from '../../types'
import { Message } from '../db/models'

const saveSystemMessage = async (
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

const saveUserMessage = async (
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

const saveOpenaiMessage = async (
  userId: string,
  chatId: string,
  model: string,
  chatCompletion: OpenAI.ChatCompletion
) => {
  const { content, role } = chatCompletion.choices[0].message

  const savedMessage = await Message.create({
    userId,
    chatId,
    content: content ?? '',
    role: role ?? 'asssistant',
    model,
  })

  return savedMessage
}

export const saveNewMessages = async (
  messages: MessageType[],
  {
    chatId,
    userId,
    model,
    chatCompletion,
  }: {
    chatId: string
    userId: string
    model: string
    chatCompletion: OpenAI.ChatCompletion
  }
) => {
  const systemMessage = messages.at(0) as MessageType
  const newMessage = messages.at(-1) as MessageType

  if (messages.length === 2)
    await saveSystemMessage(userId, chatId, systemMessage.content)
  await saveUserMessage(userId, chatId, newMessage.content)
  await saveOpenaiMessage(userId, chatId, model, chatCompletion)
}
