import { createBrowserRouter } from 'react-router-dom'

import Root from './Root.tsx'
import Chat from './Chat/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
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
