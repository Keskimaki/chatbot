import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import Loading from '../components/common/Loading'
//import useCurrentUser from '../hooks/useCurrentUser'
import useChats from '../hooks/useChats'
import { useCreateChatMutation } from '../hooks/useChatMutation'

const App = () => {
  const { t } = useTranslation()
  const { chatId } = useParams()

  //const { user, isLoading: userLoading } = useCurrentUser()
  const { chats, isLoading: chatsLoading } = useChats()

  const navigate = useNavigate()
  const mutation = useCreateChatMutation()

  useEffect(() => {
    if (chatId) return

    const createNewChat = async () => {
      const { id } = await mutation.mutateAsync(t('chat:newConversation'))
      return navigate(`/c/${id}`)
    }

    if (!chatsLoading) {
      const newChat = chats.find(({ messageCount }) => messageCount === 0)

      if (newChat) return navigate(`/c/${newChat.id}`)

      createNewChat()
    }
  }, [chatId, chats])

  if (chatsLoading) return <Loading />
}

export default App
