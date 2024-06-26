import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Paper } from '@mui/material'

import { Message } from '../../../../types'
import SystemMessage from './SystemMessage'
import Conversation from './Conversation'
import SendMessage from './SendMessage'
import {
  getCompletionStream,
  generateChatTitle,
} from '../../../services/openai'
import useChat from '../../../hooks/useChat'

const defaultSystem = 'You are a helpful programming assistant.'

const ChatBox = () => {
  const { t } = useTranslation()
  const { chatId } = useParams()
  const { chat, isLoading } = useChat(chatId)

  const [system, setSystem] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [completion, setCompletion] = useState('')

  console.log(defaultSystem)

  useEffect(() => {
    if (chat) {
      setSystem(chat.messages[0]?.content ?? defaultSystem)
      setMessages(chat.messages.slice(1))
    }
  }, [chat])

  if (isLoading || !chat) return null

  const handleSend = async () => {
    const newMessage: Message = { role: 'user', content: message }
    setMessages((prev) => [...prev, newMessage])
    setMessage('')

    const stream = await getCompletionStream(
      chatId as string,
      'gpt-4o',
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

    if (chat.name === t('chat:newConversation'))
      await generateChatTitle(chatId as string)
  }

  const systemMessageDisabled = messages.length > 0
  const sendDisabled = message.length === 0 || completion !== ''

  return (
    <Box
      sx={{
        my: '0',
        ml: '250px',
        mr: 'auto',
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
          handleSend={handleSend}
          disabled={sendDisabled}
        />
      </Paper>
    </Box>
  )
}

export default ChatBox
