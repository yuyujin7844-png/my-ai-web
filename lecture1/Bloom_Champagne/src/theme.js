import { createTheme } from '@mui/material/styles';

const MIDNIGHT_NAVY = '#0A1628';
const CHAMPAGNE_GOLD = '#D4AF37';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: CHAMPAGNE_GOLD,
      contrastText: MIDNIGHT_NAVY,
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: MIDNIGHT_NAVY,
      paper: '#0F1E35',
    },
    text: {
      primary: '#F5F0E8',
      secondary: '#A89B7A',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 600, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { letterSpacing: '0.12em', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          padding: '12px 32px',
          minHeight: 48,
        },
        outlined: {
          borderColor: '#ffffff',
          color: '#ffffff',
          '&:hover': {
            borderColor: CHAMPAGNE_GOLD,
            color: CHAMPAGNE_GOLD,
            backgroundColor: 'transparent',
          },
        },
        contained: {
          backgroundColor: CHAMPAGNE_GOLD,
          color: MIDNIGHT_NAVY,
          '&:hover': {
            backgroundColor: '#C4A030',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: MIDNIGHT_NAVY,
          scrollBehavior: 'smooth',
        },
        '*': { boxSizing: 'border-box' },
        'html, body, #root': { margin: 0, padding: 0 },
      },
    },
  },
});

export default theme;
export { MIDNIGHT_NAVY, CHAMPAGNE_GOLD };
