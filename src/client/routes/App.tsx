import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
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

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default App
