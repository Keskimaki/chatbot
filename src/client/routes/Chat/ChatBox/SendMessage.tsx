import { Box, TextField, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Set } from '../../../types'

type Props = {
  message: string
  setMessage: Set<string>
  handleSend: () => void
  disabled: boolean
}

const SendMessage = ({ message, setMessage, handleSend, disabled }: Props) => {
  const { t } = useTranslation()

  return (
    <Box mb={2}>
      <Box mb={1}>
        <Typography variant="h6">{t('chat:message')}</Typography>
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          multiline
          minRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('chat:messagePlaceholder')}
        />
      </Box>

      <Button variant="contained" onClick={handleSend} disabled={disabled}>
        {t('send')}
      </Button>
    </Box>
  )
}

export default SendMessage
