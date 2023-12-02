import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline, ThemeProvider } from '@mui/material'

import router from './routes/router.tsx'
import queryClient from './util/queryClient'
import initializeI18n from './util/i18n.ts'
import theme from './theme.ts'

await initializeI18n()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <RouterProvider router={router} />
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
