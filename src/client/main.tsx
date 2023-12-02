import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import router from './routes/router.tsx'
import queryClient from './util/queryClient'
import initializeI18n from './util/i18n.ts'

await initializeI18n()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </QueryClientProvider>
  </React.StrictMode>
)
