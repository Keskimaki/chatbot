import { Box, Paper, Typography } from '@mui/material'
import { Person, Assistant } from '@mui/icons-material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTranslation } from 'react-i18next'

import { Message } from '../../../../types'

export const Response = ({ role, content }: { role: any; content: string }) => {
  const isUser = role === 'user'

  return (
    <Box mb={2} overflow="scroll">
      <Box display="inline-block">
        <Paper variant="outlined">
          <Box display="flex">
            {isUser ? (
              <Person sx={{ mx: 3, my: 4 }} />
            ) : (
              <Assistant sx={{ mx: 3, my: 4 }} />
            )}
            <Box pr={7} py={2}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

const Conversation = ({
  messages,
  completion,
}: {
  messages: Message[]
  completion: string
}) => {
  const { t } = useTranslation()

  if (messages.length === 0 && !completion) return null

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="h6">{t('chat:conversation')}</Typography>
      </Box>
      {messages.map(({ role, content }) => (
        <Response key={content} role={role} content={content} />
      ))}
      {completion && <Response role="assistant" content={completion} />}
    </Box>
  )
}

export default Conversation
