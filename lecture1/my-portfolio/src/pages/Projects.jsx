import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function Projects() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#EDE7E1',
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
          PROJECTS
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}
        >
          Projects 페이지
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
            Projects 페이지가 개발될 공간입니다.
            <br />
            포트폴리오 작품들이 들어갈 예정입니다.
            <br />
            <br />
            필터링, 카테고리 분류, 상세 페이지 등
            <br />
            다양한 프로젝트 갤러리 기능이 추가될 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
