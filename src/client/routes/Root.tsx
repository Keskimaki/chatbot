import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline, ThemeProvider } from '@mui/material'

import useTheme from '../theme.ts'
import router from './router.tsx'
import queryClient from '../util/queryClient'

const Root = () => {
  const theme = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <RouterProvider router={router} />
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Root
