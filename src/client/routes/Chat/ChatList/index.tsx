import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import { Create } from '@mui/icons-material'
import { format } from 'date-fns'

import { ChatWithMessageCount } from '../../../types'
import useChats from '../../../hooks/useChats'

const ChatItem = ({ chat }: { chat: ChatWithMessageCount }) => {
  const { chatId } = useParams()

  const { id, name, createdAt } = chat

  const formattedDate = format(new Date(createdAt), 'd.M.yyyy')

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{ borderRadius: 2 }}
        selected={id === chatId}
        component="a"
        href={`/c/${id}`}
      >
        <ListItemText primary={name} secondary={formattedDate} />
      </ListItemButton>
    </ListItem>
  )
}

const NewChatButton = ({ chat }: { chat?: ChatWithMessageCount }) => {
  const { t } = useTranslation()

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        sx={{ borderRadius: 2 }}
        component="a"
        href={chat ? `/c/${chat.id}` : '/'}
      >
        <ListItemText primary={t('chat:newConversation')} />
        <ListItemIcon>
          <Create />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

const ChatList = () => {
  const { chats = [] } = useChats()

  const newChat = chats.find(({ messageCount }) => messageCount === 0)
  const oldChats = chats.filter(({ messageCount }) => messageCount > 0)

  // TODO: Check scrolling when there are many chats

  return (
    <Paper
      variant="outlined"
      sx={{
        py: '50px',
        px: 1,
        height: '100%',
        width: '250px',
        border: '1px solid #ccc',
        borderRadius: 0,
        position: 'fixed',
        overflow: 'scroll',
      }}
    >
      <List sx={{ pt: 2 }}>
        <NewChatButton chat={newChat} />

        <Divider />

        {oldChats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </List>
    </Paper>
  )
}

export default ChatList
