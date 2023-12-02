import { AppBar, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const { t } = useTranslation()

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h5">{t('appName')}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
