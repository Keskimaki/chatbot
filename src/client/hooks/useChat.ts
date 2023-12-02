import { useQuery } from '@tanstack/react-query'

import { ChatWithMessages } from '../types'

const useChats = (chatId?: string) => {
  const queryKey = ['chat', chatId]

  const queryFn = async () => {
    const res = await fetch(`/api/chats/${chatId}`)

    const data = (await res.json()) as ChatWithMessages

    return data
  }

  const { data: chat, ...rest } = useQuery({
    queryKey,
    queryFn,
    enabled: !!chatId,
  })

  return { chat: chat, ...rest }
}

export default useChats
