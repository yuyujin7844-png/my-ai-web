import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B6347',
      light: '#C4956A',
      dark: '#5D4037',
      contrastText: '#FFF9F0',
    },
    secondary: {
      main: '#C4956A',
      contrastText: '#3E2723',
    },
    background: {
      default: '#F5ECD7',
      paper: '#FFF9F0',
    },
    text: {
      primary: '#3E2723',
      secondary: '#795548',
    },
    divider: '#E8D5B7',
    error: { main: '#E57373' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 700 },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F5ECD7',
          maxWidth: 480,
          margin: '0 auto',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8B6347, #C4956A)',
          '&:hover': { background: 'linear-gradient(135deg, #5D4037, #8B6347)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(139,99,71,0.1)',
          backgroundColor: '#FFF9F0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFF9F0',
            '& fieldset': { borderColor: '#E8D5B7' },
            '&:hover fieldset': { borderColor: '#C4956A' },
            '&.Mui-focused fieldset': { borderColor: '#8B6347' },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF9F0',
          color: '#3E2723',
          boxShadow: '0 1px 4px rgba(139,99,71,0.1)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF9F0',
          borderTop: '1px solid #E8D5B7',
          height: 64,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#B0967A',
          '&.Mui-selected': { color: '#8B6347' },
          minWidth: 0,
          padding: '6px 0',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { border: '2px solid #E8D5B7' },
      },
    },
  },
});

export default theme;
