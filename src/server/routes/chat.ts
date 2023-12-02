import express from 'express'

import { getUserChats, getChatAndMessages } from '../services/chat'

const chatRouter = express()

chatRouter.get('/', async (req, res) => {
  const { user } = req

  const chats = await getUserChats(user.id)

  return res.send(chats)
})

chatRouter.get('/:chatId', async (req, res) => {
  const { user } = req
  const { chatId } = req.params

  const chat = await getChatAndMessages(chatId)

  if (!chat) return res.sendStatus(404)
  if (chat.userId !== user.id) return res.sendStatus(403)

  return res.send(chat)
})

export default chatRouter
