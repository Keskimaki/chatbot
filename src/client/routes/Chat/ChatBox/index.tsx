import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Paper } from '@mui/material'

import { OpenaiMessage } from '../../../../types'
import SystemMessage from './SystemMessage'
import Conversation from './Conversation'
import SendMessage from './SendMessage'
import { getCompletionStream } from '../../../services/openai'

const ChatBox = () => {
  const { chatId } = useParams()

  const [system, setSystem] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<OpenaiMessage[]>([])
  const [completion, setCompletion] = useState('')

  const handleReset = () => {
    setSystem('')
    setMessage('')
    setMessages([])
    setCompletion('')
  }

  const handleSend = async () => {
    const newMessage: OpenaiMessage = { role: 'user', content: message }
    setMessages((prev) => [...prev, newMessage])
    setMessage('')

    const stream = await getCompletionStream(
      chatId as string,
      'gpt-3.5-turbo',
      system,
      messages.concat(newMessage)
    )

    const reader = stream.getReader()

    let content = ''
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read()

      if (done) break

      const text = new TextDecoder().decode(value)

      setCompletion((prev) => prev + text)
      content += text
    }

    setMessages((prev) => [...prev, { role: 'assistant', content }])
    setCompletion('')
  }

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
          border: '1px solid #ccc',
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

export default ChatBox
