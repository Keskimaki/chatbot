import express from 'express'

import { ChatOptions } from '../types'
import { createCompletionStream } from '../services/openai'

const openaiRouter = express()

openaiRouter.post('/stream', async (req, res) => {
  const { model, messages } = req.body as ChatOptions

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
