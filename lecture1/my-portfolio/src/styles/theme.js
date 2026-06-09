import { createTheme } from '@mui/material/styles'

const palette = {
  primary:   { main: '#1C0A14', light: '#6B1D35', dark: '#0D0409', contrastText: '#F2EDE8' },
  secondary: { main: '#8B1A2F', light: '#B5253E', dark: '#6B1D35', contrastText: '#F7F3EF' },
  background: { default: '#F2EDE8', paper: '#F7F3EF' },
  text: { primary: '#1A1A1A', secondary: '#555555', disabled: '#888888' },
  divider: '#D9D0C8',
}

const theme = createTheme({
  palette,
  typography: {
    fontFamily: "'Pretendard', 'Noto Sans KR', 'Roboto', sans-serif",
    h1: { fontWeight: 700, color: palette.text.primary },
    h2: { fontWeight: 700, color: palette.text.primary },
    h3: { fontWeight: 600, color: palette.text.primary },
    h4: { fontWeight: 600, color: palette.text.primary },
    body1: { color: palette.text.secondary },
    body2: { color: palette.text.secondary },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main,
          color: '#F2EDE8',
          boxShadow: '0 2px 8px rgba(28,10,20,0.18)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: palette.secondary.main,
          color: '#F7F3EF',
          boxShadow: '0 2px 4px rgba(139,26,47,0.25)',
          '&:hover': { backgroundColor: palette.secondary.dark },
        },
        outlinedPrimary: {
          borderColor: palette.secondary.main,
          color: palette.secondary.main,
          '&:hover': { borderColor: palette.secondary.dark, color: palette.secondary.dark },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#F7F3EF',
          border: '1px solid #D9D0C8',
          boxShadow: '0 2px 8px rgba(28,10,20,0.08)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#D9D0C8' } },
    },
  },
})

export default theme
