import OpenAI from 'openai'

import { ChatOptions } from '../types'
import { Message } from '../db/models'
import { OPENAI_API_KEY } from '../util/config'
import { chatTitleSchema } from '../validators/openai'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

const getCompletionContent = (completion: OpenAI.ChatCompletion) => {
  const { content } = completion.choices[0].message

  return content
}

export const createCompletionStream = (options: ChatOptions) => {
  const stream = openai.beta.chat.completions.stream({
    ...options,
    stream: true,
  })

  return stream
}

export const generateChatTitle = async (messages: Message[]) => {
  const system = {
    role: 'system' as const,
    content:
      'Generate a short title for the following conversation. Give your answer in the following JSON format: { "title": "title-goes-here" }',
  }

  const completion = await openai.chat.completions.create({
    messages: [
      system,
      ...messages.map(({ role, content }) => ({ role, content })),
    ],
    model: 'gpt-3.5-turbo-1106',
    response_format: {
      type: 'json_object',
    },
  })

  const content = getCompletionContent(completion) ?? ''
  const { title } = chatTitleSchema.parse(JSON.parse(content))

  return title
}
