import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #1C0A14 0%, #3D1526 60%, #6B1D35 100%)',
        color: '#F2EDE8',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: '#B5253E', letterSpacing: 4, fontSize: '0.85rem', mb: 2, display: 'block' }}
        >
          WELCOME TO MY PORTFOLIO
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            color: '#F2EDE8',
            lineHeight: 1.2,
            mb: 3,
          }}
        >
          여기는 Hero 섹션입니다.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#C4B8B0',
            fontWeight: 400,
            mb: 2,
            fontSize: { xs: '1rem', md: '1.3rem' },
          }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>

        <Box
          sx={{
            width: 60,
            height: 3,
            bgcolor: '#8B1A2F',
            mx: 'auto',
            my: 4,
            borderRadius: 2,
          }}
        />

        <Typography
          variant="body1"
          sx={{ color: '#8A7E78', fontSize: '0.95rem', mb: 5 }}
        >
          이름 · 직함 · 한 줄 소개
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#8B1A2F',
              color: '#F7F3EF',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { bgcolor: '#6B1D35' },
            }}
          >
            Projects 보기
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#F2EDE8',
              color: '#F2EDE8',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { borderColor: '#B5253E', color: '#B5253E' },
            }}
          >
            About Me
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
