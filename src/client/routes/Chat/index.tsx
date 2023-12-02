import { useState } from 'react'
import { Box, Paper } from '@mui/material'

import SystemMessage from './SystemMessage'
import Conversation from './Conversation'
import SendMessage from './SendMessage'

const Chat = () => {
  const [system, setSystem] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [completion, setCompletion] = useState('')

  const handleReset = () => {
    setSystem('')
    setMessage('')
    setMessages([])
    setCompletion('')
  }

  const handleSend = () => null

  const systemMessageDisabled = messages.length > 0
  const sendDisabled = message.length === 0 || completion !== ''
  const resetDisabled =
    messages.length === 0 && system.length === 0 && message.length === 0

  return (
    <Box
      sx={{
        margin: '0 auto',
        width: '90%',
        padding: '5%',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: '5% 10%',
          mt: 5,
        }}
      >
        <SystemMessage
          system={system}
          setSystem={setSystem}
          disabled={systemMessageDisabled}
        />
        <Conversation messages={messages} completion={completion} />
        <SendMessage
          message={message}
          setMessage={setMessage}
          handleReset={handleReset}
          handleSend={handleSend}
          disabled={sendDisabled}
          resetDisabled={resetDisabled}
        />
      </Paper>
    </Box>
  )
}

export default Chat
