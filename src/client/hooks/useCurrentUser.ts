import { useQuery } from '@tanstack/react-query'

import { User } from '../types'

const useCurrentUser = () => {
  const queryKey = ['me']

  const queryFn = async () => {
    const res = await fetch('/api/users/me')

    const data = (await res.json()) as User

    return data
  }

  const { data: user, ...rest } = useQuery({ queryKey, queryFn })

  return { user, ...rest }
}

export default useCurrentUser
