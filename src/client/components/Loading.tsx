import { Box, CircularProgress, Alert } from '@mui/material'

type Props = {
  isError?: boolean
  message?: string
}

const Loading = ({ isError = false, message = '' }: Props) => (
  <Box display="flex" justifyContent="center" my={4}>
    <Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress />
      <Box height={10} py={4}>
        {isError && <Alert severity="warning">{message}</Alert>}
      </Box>
    </Box>
  </Box>
)

export default Loading
