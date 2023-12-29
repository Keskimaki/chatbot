import express from 'express'

import { createCompletionStream, parseChunk } from '../services/model'
import { completionSchema } from '../validators/model'

const modelRouter = express()

modelRouter.post('/stream', async (req, res) => {
  const { prompt } = completionSchema.parse(req.body)

  const reader = await createCompletionStream(prompt)
  const decoder = new TextDecoder('utf-8')

  res.setHeader('content-type', 'text/plain')

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value)
    const event = parseChunk(chunk)

    res.write(event.token)
  }

  res.end()
})

export default modelRouter
