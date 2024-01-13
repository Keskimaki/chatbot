import express from 'express'

import { openaiStreamSchema } from '../validators/openai'
import { createCompletionStream, generateChatTitle } from '../services/openai'
import { getChatAndMessages, updateChatTitle } from '../services/chat'
import { saveNewMessages } from '../services/message'

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

  const chatCompletion = await stream.finalChatCompletion()

  await saveNewMessages(messages, {
    chatId,
    userId: user.id,
    model,
    chatCompletion,
  })

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
