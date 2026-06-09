import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F9C74F',
      light: '#FFF3CD',
      dark: '#C99A10',
      contrastText: '#5D4037',
    },
    secondary: {
      main: '#FF8B94',
      light: '#FFB3BA',
      dark: '#E57070',
      contrastText: '#fff',
    },
    background: {
      default: '#FFFDF0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A3728',
      secondary: '#8D6E63',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #F9C74F 0%, #F4A61D 100%)',
          color: '#5D4037',
          '&:hover': {
            background: 'linear-gradient(135deg, #F4A61D 0%, #E09010 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(249,199,79,0.12)',
          border: '1px solid rgba(249,199,79,0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(249,199,79,0.25)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&.Mui-focused fieldset': { borderColor: '#F9C74F' },
          },
          '& label.Mui-focused': { color: '#C99A10' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
  },
});

export default theme;
