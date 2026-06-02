import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import EmailIcon from '@mui/icons-material/Email'

const GRADIENT = 'linear-gradient(135deg, #FF6262 0%, #FF9966 100%)'

const NAV_ITEMS = [
  { label: '홈', icon: <HomeIcon fontSize="small" /> },
  { label: '소개', icon: <InfoIcon fontSize="small" /> },
  { label: '연락처', icon: <EmailIcon fontSize="small" /> },
]

const CARDS = [
  {
    title: '카드 1',
    desc: '첫 번째 카드 내용입니다. 원하는 내용을 자유롭게 작성하세요.',
    bg: '#FFE8E8',
    accent: '#FF6262',
  },
  {
    title: '카드 2',
    desc: '두 번째 카드 내용입니다. 원하는 내용을 자유롭게 작성하세요.',
    bg: '#E8F4FF',
    accent: '#4A90D9',
  },
  {
    title: '카드 3',
    desc: '세 번째 카드 내용입니다. 원하는 내용을 자유롭게 작성하세요.',
    bg: '#E8FFF0',
    accent: '#4CAF50',
  },
]

function Header() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ background: GRADIENT }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          My App
        </Typography>
        {NAV_ITEMS.map(({ label, icon }) => (
          <Button
            key={label}
            color="inherit"
            startIcon={icon}
            sx={{ ml: 1, fontWeight: 600 }}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}

function Content() {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 6, bgcolor: '#F9F9F7' }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight={700}>
          메인 콘텐츠
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          MUI ThemeProvider가 적용된 기본 레이아웃입니다.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {CARDS.map(({ title, desc, bg, accent }) => (
            <Card
              key={title}
              elevation={0}
              sx={{
                bgcolor: bg,
                borderLeft: `6px solid ${accent}`,
                borderRadius: 3,
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight={700} sx={{ color: accent, mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 3, background: GRADIENT }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          © 2026 My App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Content />
      <Footer />
    </Box>
  )
}

export default App
