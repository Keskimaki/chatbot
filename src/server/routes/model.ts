import express from 'express'

import {
  createCompletionStream as createOpenAiStream,
  parsePrompt as parseOpenAiPrompt,
} from '../services/openai'
import {
  createCompletionStream,
  parseChunk,
  parseModelPrompt,
} from '../services/model'
import { completionSchema } from '../validators/model'

const openAiModels = ['gpt-3.5-turbo', 'gpt-4']

const modelRouter = express()

modelRouter.post('/stream', async (req, res) => {
  const { model, prompt } = completionSchema.parse(req.body)

  if (openAiModels.includes(model)) {
    console.log('openai')
    const messages = parseOpenAiPrompt(prompt)
    const stream = createOpenAiStream({ model, messages })

    res.setHeader('content-type', 'text/plain')

    stream.on('content', (delta) => {
      res.write(delta)
    })

    await stream.finalChatCompletion()

    return res.end()
  }

  const parsedPrompt = parseModelPrompt(prompt)

  const reader = await createCompletionStream(parsedPrompt)
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

  return res.end()
})

export default modelRouter
