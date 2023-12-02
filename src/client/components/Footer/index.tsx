import { Box, Typography, Link } from '@mui/material'
import { Trans } from 'react-i18next'

import styles from './styles'

const supportEmail = 'noreply@example.fi'

const SupportBox = () => (
  <Box sx={styles.supportBox}>
    <Typography>
      <Trans
        i18nKey="footer:contactSupport"
        values={{ supportEmail }}
        components={{
          mailTo: <Link href={`mailto:${supportEmail}`} underline="hover" />,
        }}
      />
    </Typography>
  </Box>
)

const Footer = () => (
  <Box component="footer" sx={styles.footer}>
    <SupportBox />
  </Box>
)

export default Footer
