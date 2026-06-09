import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function AboutMe() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#F2EDE8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: '#8B1A2F', letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}
        >
          ABOUT ME
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}
        >
          About Me 페이지
        </Typography>

        <Divider sx={{ width: 60, height: 3, bgcolor: '#8B1A2F', mx: 'auto', my: 3, border: 'none' }} />

        <Box
          sx={{
            bgcolor: '#F7F3EF',
            border: '1px solid #D9D0C8',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            boxShadow: '0 2px 8px rgba(28,10,20,0.08)',
          }}
        >
          <Typography variant="h5" sx={{ color: '#8B1A2F', fontWeight: 600, mb: 2 }}>
            🚧 개발 예정
          </Typography>
          <Typography variant="body1" sx={{ color: '#555555', lineHeight: 1.8 }}>
            About Me 페이지가 개발될 공간입니다.
            <br />
            상세한 자기소개가 들어갈 예정입니다.
            <br />
            <br />
            학력, 경력, 취미, 가치관 등 다양한 자기소개 콘텐츠가
            <br />
            이 페이지에 배치될 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
