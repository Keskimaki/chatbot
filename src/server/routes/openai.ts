import express from 'express'

import { openaiStreamSchema } from '../validators/openai'
import { createCompletionStream } from '../services/openai'

const openaiRouter = express()

openaiRouter.post('/stream', async (req, res) => {
  const { model, messages } = openaiStreamSchema.parse(req.body)

  // TODO: Add authentication etc.

  const stream = createCompletionStream({ model, messages })

  res.setHeader('content-type', 'text/plain')

  stream.on('content', (delta) => {
    res.write(delta)
  })

  await stream.finalChatCompletion()

  res.end()
})

export default openaiRouter
