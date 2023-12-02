import { useMemo } from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: '#f5f5f5',
    },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
        },
        outlined: {
          borderWidth: '2px',
          ':hover': {
            borderWidth: '2px',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
}

const useTheme = () => {
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(themeOptions)),
    []
  )

  return theme
}

export default useTheme
