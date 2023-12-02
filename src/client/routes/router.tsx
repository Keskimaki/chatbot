import { createBrowserRouter } from 'react-router-dom'

import Root from './Root.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/admin',
        element: <h1>Admin</h1>,
      },
    ],
  },
])

export default router
