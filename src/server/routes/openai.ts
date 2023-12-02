import express from 'express'

import { openaiStreamSchema } from '../validators/openai'
import { createCompletionStream } from '../services/openai'
import { saveOpenaiMessage } from '../services/message'

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
  await saveOpenaiMessage(user.id, chatId, model, chatCompletion)

  res.end()
})

export default openaiRouter
