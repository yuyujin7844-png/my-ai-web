import { createTheme } from '@mui/material/styles';

export const DEEP_NAVY = '#050A1C';
export const DARKER_NAVY = '#030710';
export const CARD_NAVY = '#081525';
export const CHAMPAGNE_GOLD = '#D4AF37';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: CHAMPAGNE_GOLD,
      contrastText: DEEP_NAVY,
    },
    secondary: { main: '#ffffff' },
    background: {
      default: DEEP_NAVY,
      paper: CARD_NAVY,
    },
    text: {
      primary: '#F5F0E8',
      secondary: '#A89B7A',
    },
  },
  typography: {
    // 기본 한글 폰트: Noto Sans KR
    fontFamily: '"Noto Sans KR", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", "Noto Sans KR", serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", "Noto Sans KR", serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", "Noto Sans KR", serif',
      fontWeight: 600,
    },
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 500 },
    h5: { fontFamily: '"Playfair Display", serif', fontWeight: 500 },
    h6: { fontFamily: '"Playfair Display", serif', fontWeight: 500 },
    // 버튼: Pretendard
    button: {
      fontFamily: '"Pretendard Variable", "Pretendard", "Noto Sans KR", sans-serif',
      letterSpacing: '0.1em',
      fontWeight: 600,
    },
    body1: { fontFamily: '"Noto Sans KR", sans-serif' },
    body2: { fontFamily: '"Noto Sans KR", sans-serif' },
    caption: { fontFamily: '"Noto Sans KR", sans-serif' },
    overline: { fontFamily: '"Noto Sans KR", sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          padding: '12px 32px',
          minHeight: 48,
          fontFamily: '"Pretendard Variable", "Pretendard", "Noto Sans KR", sans-serif',
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
          color: DEEP_NAVY,
          '&:hover': { backgroundColor: '#C4A030' },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: DEEP_NAVY,
          scrollBehavior: 'smooth',
        },
        '*': { boxSizing: 'border-box' },
        'html, body, #root': { margin: 0, padding: 0 },
      },
    },
  },
});

export default theme;

// 하위호환 alias
export const MIDNIGHT_NAVY = DEEP_NAVY;
