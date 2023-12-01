import { useQuery } from '@tanstack/react-query'

import { ChatWithMessages } from '../types'

const useChatWithMessages = (chatId: string) => {
  const queryKey = ['chats', chatId]

  const queryFn = async (): Promise<ChatWithMessages> => {
    const res = await fetch(`/api/chats/${chatId}`)

    const data = await res.json()

    return data
  }

  const { data: chat, ...rest } = useQuery({ queryKey, queryFn })

  return { chat: chat, ...rest }
}

export default useChatWithMessages
