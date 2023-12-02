import { Box, Typography, List, ListItem } from '@mui/material'

import useChats from './hooks/useChats'

const App = () => {
  const { chats, isLoading } = useChats()

  // TODO: Add loading indicator
  if (isLoading) return null

  console.log(chats)

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
