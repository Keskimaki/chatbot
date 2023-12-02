import { useParams } from 'react-router-dom'
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { ChatWithMessageCount } from '../../../types'
import useChats from '../../../hooks/useChats'

const ChatItem = ({ chat }: { chat: ChatWithMessageCount }) => {
  const { chatId } = useParams()

  const { id, name } = chat

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        sx={{ borderRadius: 2 }}
        selected={id === chatId}
        component="a"
        href={`/c/${id}`}
      >
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}

const ChatList = () => {
  const { chats = [] } = useChats()

  return (
    <Paper
      variant="outlined"
      sx={{
        height: '100%',
        width: '250px',
        border: '1px solid #ccc',
      }}
    >
      <List sx={{ pt: 2 }}>
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </List>
    </Paper>
  )
}

export default ChatList
