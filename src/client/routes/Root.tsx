import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Root = () => (
  <Box>
    <NavBar />
    <Container>
      <Outlet />
    </Container>
    <Footer />
  </Box>
)

export default Root
