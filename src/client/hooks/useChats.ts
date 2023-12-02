import { useQuery } from '@tanstack/react-query'

import { ChatWithMessageCount } from '../types'

export const queryKey = ['chats']

const useChats = () => {
  const queryFn = async () => {
    const res = await fetch('/api/chats')

    const data = (await res.json()) as ChatWithMessageCount[]

    return data
  }

  const { data: chats, ...rest } = useQuery({ queryKey, queryFn })

  return { chats: chats ?? [], ...rest }
}

export default useChats
