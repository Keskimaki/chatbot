import express from 'express'

import { getUserChats, getChatAndMessages, newChat } from '../services/chat'
import { newChatSchema } from '../validators/chat'

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

chatRouter.post('/', async (req, res) => {
  const { user } = req
  const { name } = newChatSchema.parse(req.body)

  const chat = await newChat(user.id, name)

  return res.send(chat)
})

export default chatRouter
