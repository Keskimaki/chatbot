import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material'
import { AdminPanelSettingsOutlined, Language } from '@mui/icons-material'

import styles from './styles'
import placeholderLogo from '../../assets/placeholder.svg'
import useCurrentUser from '../../hooks/useCurrentUser'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const anchorRef = useRef<HTMLButtonElement>(null)
  const [openLanguageSelect, setOpenLanguageSelect] = useState(false)

  const languages = ['fi']
  const language = i18n.language

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
    setOpenLanguageSelect(false)
  }

  return (
    <>
      <Button
        ref={anchorRef}
        id="composition-button"
        data-cy="language-select"
        aria-controls={openLanguageSelect ? 'composition-menu' : undefined}
        aria-expanded={openLanguageSelect ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() => setOpenLanguageSelect(!openLanguageSelect)}
      >
        <Language sx={styles.language} /> {language}
      </Button>
      <Popper
        open={openLanguageSelect}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener
                onClickAway={() => setOpenLanguageSelect(!openLanguageSelect)}
              >
                <MenuList
                  autoFocusItem={openLanguageSelect}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {languages.map((l) => (
                    <MenuItem
                      key={l}
                      sx={[styles.item, language === l && styles.activeItem]}
                      onClick={() => {
                        handleLanguageChange(l)
                      }}
                    >
                      {l.toUpperCase()}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const NavBar = () => {
  const { t } = useTranslation()

  const { user } = useCurrentUser()

  return (
    <AppBar position="sticky" sx={styles.appbar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navBox}>
          <img src={placeholderLogo} alt="placeholder logo" width="40" />
          <Box ml="2rem">
            <Typography sx={styles.appName}>{t('appName')}</Typography>
          </Box>
        </Box>

        <Box>
          {user?.isAdmin && (
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <Button>
                <AdminPanelSettingsOutlined sx={styles.icon} /> {t('admin')}
              </Button>
            </Link>
          )}

          <LanguageSelector />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
