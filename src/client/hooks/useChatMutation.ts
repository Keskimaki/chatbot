import { useMutation } from '@tanstack/react-query'

import { Chat } from '../types'
import queryClient from '../util/queryClient'
import { queryKey } from './useChats'

export const useCreateChatMutation = () => {
  const mutationFn = async (name: string) => {
    const res = await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    const chat = (await res.json()) as Chat

    return chat
  }

  const mutation = useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  })

  return mutation
}
