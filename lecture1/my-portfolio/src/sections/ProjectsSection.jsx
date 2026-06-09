import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

const PLACEHOLDER_PROJECTS = [
  { title: '프로젝트 1', desc: '프로젝트 설명이 들어갈 예정입니다.', tags: ['React', 'MUI'] },
  { title: '프로젝트 2', desc: '프로젝트 설명이 들어갈 예정입니다.', tags: ['Next.js', 'TypeScript'] },
  { title: '프로젝트 3', desc: '프로젝트 설명이 들어갈 예정입니다.', tags: ['Node.js', 'MongoDB'] },
]

export default function ProjectsSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: '#EDE7E1', textAlign: 'center' }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{ color: '#8B1A2F', letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}
        >
          PROJECTS
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}
        >
          여기는 Projects 섹션입니다.
        </Typography>

        <Divider sx={{ width: 60, height: 3, bgcolor: '#8B1A2F', mx: 'auto', my: 3, border: 'none' }} />

        <Typography variant="body1" sx={{ color: '#555555', mb: 6 }}>
          대표작 썸네일 3–4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {PLACEHOLDER_PROJECTS.map((project, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(28,10,20,0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    bgcolor: '#1C0A14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#F2EDE8', opacity: 0.3, fontWeight: 700 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                  <Typography variant="h6" fontWeight={700} mb={1} color="#1A1A1A">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="#555555" mb={2}>
                    {project.desc}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ bgcolor: '#EDE7E1', color: '#8B1A2F', fontWeight: 600, fontSize: '0.75rem' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: '#8B1A2F',
            color: '#8B1A2F',
            px: 5,
            py: 1.5,
            fontWeight: 600,
            '&:hover': { bgcolor: '#8B1A2F', color: '#F7F3EF' },
          }}
        >
          더 보기 →
        </Button>
      </Container>
    </Box>
  )
}
