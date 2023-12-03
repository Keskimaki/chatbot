import React from 'react'
import ReactDOM from 'react-dom/client'

import initializeI18n from './util/i18n.ts'
import Root from './routes/Root.tsx'

initializeI18n()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
