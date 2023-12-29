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
import { saveNewMessages } from '../services/message'

const openAiModels = ['gpt-3.5-turbo', 'gpt-4']

const modelRouter = express()

modelRouter.post('/stream', async (req, res) => {
  const { user } = req
  const { chatId, model, prompt } = completionSchema.parse(req.body)
  const { system, messages } = prompt

  if (openAiModels.includes(model)) {
    const openAiMessages = parseOpenAiPrompt(prompt)
    const stream = createOpenAiStream({ model, messages: openAiMessages })

    res.setHeader('content-type', 'text/plain')

    stream.on('content', (delta) => {
      res.write(delta)
    })

    const chatCompletion = await stream.finalChatCompletion()
    const completion = chatCompletion.choices[0].message.content ?? ''

    await saveNewMessages(chatId, user.id, system, messages, model, completion)

    return res.end()
  }

  const parsedPrompt = parseModelPrompt(prompt)

  const reader = await createCompletionStream(parsedPrompt)
  const decoder = new TextDecoder('utf-8')

  res.setHeader('content-type', 'text/plain')

  let completion = ''
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value)
    const { token } = parseChunk(chunk)
    completion += token

    res.write(token)
  }

  await saveNewMessages(chatId, user.id, system, messages, model, completion)

  return res.end()
})

export default modelRouter
