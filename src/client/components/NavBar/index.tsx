import { AppBar, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import styles from './styles'

const NavBar = () => {
  const { t } = useTranslation()

  return (
    <AppBar position="relative" sx={styles.appbar}>
      <Toolbar sx={styles.toolbar}>
        <Typography sx={styles.appName}>{t('appName')}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
