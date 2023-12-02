import { OpenaiMessage } from '../types'

export type ChatOptions = {
  messages: OpenaiMessage[]
  model: string
}
