import { Box } from '@mui/material'

import ChatList from './ChatList'
import ChatBox from './ChatBox'

const Chat = () => {
  return (
    <Box display="flex">
      <ChatList />
      <ChatBox />
    </Box>
  )
}

export default Chat
