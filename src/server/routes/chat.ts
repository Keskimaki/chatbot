import express from 'express'

import { getUserChats, getChatAndMessages } from '../services/chat.js'

const chatRouter = express()

// TODO: Add authentication middleware

chatRouter.get('/', async (req, res) => {
  const { userId } = req.query

  const chats = await getUserChats(userId as string)

  return res.send(chats)
})

chatRouter.get('/:chatId', async (req, res) => {
  const { chatId } = req.params

  const chat = await getChatAndMessages(chatId)

  if (!chat) return res.sendStatus(404)

  return res.send(chat)
})

export default chatRouter
