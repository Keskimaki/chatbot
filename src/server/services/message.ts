import OpenAI from 'openai'

import { Message } from '../db/models'

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

export const saveOpenaiMessage = async (
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
