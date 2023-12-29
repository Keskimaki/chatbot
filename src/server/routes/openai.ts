import express from 'express'

import { generateChatTitle } from '../services/openai'
import { getChatAndMessages, updateChatTitle } from '../services/chat'

const openaiRouter = express()

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
