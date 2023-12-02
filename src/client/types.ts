export type Set<T> = React.Dispatch<React.SetStateAction<T>>

export type Chat = {
  id: string
  name: string
}

export type Message = {
  id: string
  userId: string
  content: string
  role: string
  model: string
}

export type ChatWithMessages = Chat & {
  Messages: Message[]
}
