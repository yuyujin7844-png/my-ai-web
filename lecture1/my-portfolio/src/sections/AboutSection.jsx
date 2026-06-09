import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'

export default function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#EDE7E1',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: '#8B1A2F', letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}
        >
          ABOUT ME
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}
        >
          여기는 About Me 섹션입니다.
        </Typography>

        <Divider sx={{ width: 60, height: 3, bgcolor: '#8B1A2F', mx: 'auto', my: 3, border: 'none' }} />

        <Typography
          variant="body1"
          sx={{ color: '#555555', fontSize: '1.05rem', lineHeight: 1.8, mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
          <br />
          개발 경력, 관심 분야, 목표 등이 이 영역에 배치됩니다.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#8B1A2F',
            color: '#F7F3EF',
            px: 5,
            py: 1.5,
            fontWeight: 600,
            '&:hover': { bgcolor: '#6B1D35' },
          }}
        >
          더 알아보기 →
        </Button>
      </Container>
    </Box>
  )
}
