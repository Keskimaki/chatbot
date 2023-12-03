import { createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import Chat from './Chat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/c/:chatId',
        element: <Chat />,
      },
      {
        path: '/admin',
        element: <h1>Admin</h1>,
      },
    ],
  },
])

export default router
