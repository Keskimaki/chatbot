import { OpenaiMessage } from '../types'

export type Set<T> = React.Dispatch<React.SetStateAction<T>>

export type Chat = {
  id: string
  name: string
}

export type Message = OpenaiMessage & {
  id: string
  userId: string
  model: string
}

export type ChatWithMessages = Chat & {
  messages: Message[]
}

export type ChatWithMessageCount = Chat & {
  messageCount: number
}

export type User = {
  id: string
  username: string
  isAdmin: boolean
}
