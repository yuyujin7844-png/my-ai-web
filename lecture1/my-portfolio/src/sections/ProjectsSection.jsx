import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import LaunchIcon from '@mui/icons-material/Launch'
import supabase from '../lib/supabase'

function PreviewCard({ project }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s, box-shadow 0.25s',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: '0 12px 32px rgba(28,10,20,0.18)',
        },
      }}
    >
      <Box sx={{ height: 160, bgcolor: '#1C0A14', overflow: 'hidden' }}>
        {imgError ? (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ color: '#F2EDE8', opacity: 0.15, fontWeight: 700 }}>
              {project.title.charAt(0)}
            </Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={project.thumbnail_url}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, textAlign: 'left', p: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={0.5} color="#1A1A1A" noWrap>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="#555555"
          mb={1.5}
          sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1.5 }}>
          {project.tech_stack?.slice(0, 3).map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ bgcolor: '#EDE7E1', color: '#8B1A2F', fontWeight: 600, fontSize: '0.7rem', height: 22 }}
            />
          ))}
        </Box>
        {project.detail_url && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
            href={project.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: '#8B1A2F',
              color: '#8B1A2F',
              fontSize: '0.72rem',
              px: 1.5,
              py: 0.5,
              '&:hover': { bgcolor: '#8B1A2F', color: '#F7F3EF' },
            }}
          >
            Live Demo
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function ProjectsSection() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(3)

      setProjects(data ?? [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#EDE7E1', textAlign: 'center' }}>
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
          My Works
        </Typography>
        <Divider sx={{ width: 60, height: 3, bgcolor: '#8B1A2F', mx: 'auto', my: 3, border: 'none' }} />
        <Typography variant="body1" sx={{ color: '#555555', mb: 6 }}>
          직접 기획하고 개발한 대표 프로젝트들입니다.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card>
                    <Skeleton variant="rectangular" height={160} />
                    <CardContent>
                      <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : projects.map(project => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <PreviewCard project={project} />
                </Grid>
              ))}
        </Grid>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/projects')}
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
