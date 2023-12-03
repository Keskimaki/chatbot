import { Theme } from '@mui/material/styles'

const styles = {
  appbar: {
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 0,
    borderBottom: '1px solid black',
    py: '1rem',
  },
  toolbar: {
    display: 'flex',
    width: '100%',
    '@media print': {
      display: 'none',
    },
    justifyContent: 'space-between',
    padding: '0.2rem 0 0.2rem 0',
  },
  appName: {
    textTransform: 'uppercase',
    color: 'black',
    fontWeight: 700,
    fontSize: 24,
    userSelect: 'none',
  },
  navBox: (theme: Theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    marginRight: 1,
    fontWeight: theme.typography.fontWeightMedium,
    padding: '5px 12px',
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 0.1s',
    borderRadius: 3,
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
  icon: { mr: 1 },
  language: { mr: 1 },
  item: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  activeItem: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  }),
}

export default styles
