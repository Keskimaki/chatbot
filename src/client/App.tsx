import { Box, Typography, List, ListItem } from '@mui/material'

import useChats from './hooks/useChats'
import Loading from './components/Loading'

const App = () => {
  const { chats, isLoading } = useChats()

  if (isLoading) return <Loading />

  return (
    <Box>
      <Typography variant="h4">Chats</Typography>
      <List>
        {chats.map(({ id, name }) => (
          <ListItem key={id}>{name}</ListItem>
        ))}
      </List>
    </Box>
  )
}

export default App
