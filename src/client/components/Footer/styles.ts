import { Theme } from '@mui/material/styles'

const styles = {
  supportBox: {
    py: '2rem',
    px: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: (theme: Theme) => ({
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    borderRadius: 0,
    borderTop: '1px solid #ccc',
  }),
}

export default styles
