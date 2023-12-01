import { useQuery } from '@tanstack/react-query'

import { Chat } from '../types'

export const queryKey = ['chats']

const useChats = () => {
  const queryFn = async (): Promise<Chat[]> => {
    const res = await fetch('/api/chats')

    const data = await res.json()

    return data
  }

  const { data: chats, ...rest } = useQuery({ queryKey, queryFn })

  return { chats: chats, ...rest }
}

export default useChats
