import express from 'express'

import { Message } from '../../types'
import { openaiStreamSchema } from '../validators/openai'
import { createCompletionStream, generateChatTitle } from '../services/openai'
import { getChatAndMessages, updateChatTitle } from '../services/chat'
import {
  saveSystemMessage,
  saveUserMessage,
  saveOpenaiMessage,
} from '../services/message'

const openaiRouter = express()

openaiRouter.post('/stream', async (req, res) => {
  const { user } = req
  const { chatId, model, messages } = openaiStreamSchema.parse(req.body)

  // TODO: Add authentication etc.

  const stream = createCompletionStream({ model, messages })

  res.setHeader('content-type', 'text/plain')

  stream.on('content', (delta) => {
    res.write(delta)
  })

  const systemMessage = messages.at(0) as Message
  const newMessage = messages.at(-1) as Message
  const chatCompletion = await stream.finalChatCompletion()

  if (messages.length === 2)
    await saveSystemMessage(user.id, chatId, systemMessage.content)
  await saveUserMessage(user.id, chatId, newMessage.content)
  await saveOpenaiMessage(user.id, chatId, model, chatCompletion)

  res.end()
})

openaiRouter.post('/title/:chatId', async (req, res) => {
  const { user } = req
  const { chatId } = req.params

  const chat = await getChatAndMessages(chatId)

  if (!chat) return res.sendStatus(404)
  if (chat.userId !== user.id) return res.sendStatus(403)

  const title = await generateChatTitle(chat.messages)
  await updateChatTitle(chatId, title)

  return res.send({ title })
})

export default openaiRouter
