import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import supabase from '../lib/supabase'

// ─── 프로젝트 카드 ────────────────────────────────────
// 호버: 카드 부상 + 이미지 줌·필터 + 오버레이 슬라이드업 + 버튼 리빌
function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Card
      sx={{
        height: '100%', display: 'flex', flexDirection: 'column',
        willChange: 'transform',
        transition: [
          'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          'box-shadow 0.32s ease',
        ].join(', '),

        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 28px 56px rgba(28,10,20,0.22), 0 8px 16px rgba(28,10,20,0.1)',
          },
          '&:hover .thumb-img': {
            transform: 'scale(1.07)',
            filter: 'brightness(0.7) saturate(1.15)',
          },
          '&:hover .thumb-overlay': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          // 하단 버튼 영역 살짝 올라오는 효과
          '&:hover .card-actions': {
            borderColor: 'rgba(139,26,47,0.15)',
          },
        },
        '&:active': { transform: 'translateY(-4px)' },
      }}
    >
      {/* ── 썸네일 + 오버레이 ── */}
      <Box
        sx={{
          position: 'relative', overflow: 'hidden',
          height: 400, bgcolor: '#1C0A14', flexShrink: 0,
        }}
      >
        {imgError ? (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ color: '#F2EDE8', opacity: 0.12, fontWeight: 700 }}>
              {project.title.charAt(0)}
            </Typography>
          </Box>
        ) : (
          <CardMedia
            className="thumb-img"
            component="img"
            image={project.thumbnail_url}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{
              height: '100%', objectFit: 'cover', objectPosition: 'top',
              willChange: 'transform, filter',
              transition: 'transform 0.5s ease, filter 0.5s ease',
            }}
          />
        )}

        {/* 오버레이 */}
        <Box
          className="thumb-overlay"
          aria-hidden="true"
          sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(28,10,20,0.95) 0%, rgba(28,10,20,0.4) 55%, transparent 100%)',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            p: 3,
          }}
        >
          <Typography sx={{ color: '#F2EDE8', fontWeight: 700, fontSize: '1.2rem', mb: 0.6, lineHeight: 1.3 }}>
            {project.title}
          </Typography>
          <Typography sx={{ color: 'rgba(242,237,232,0.7)', fontSize: '0.82rem', lineHeight: 1.6, mb: 1.5 }}>
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <OpenInNewIcon sx={{ color: 'rgba(242,237,232,0.55)', fontSize: 14 }} />
            <Typography sx={{ color: 'rgba(242,237,232,0.55)', fontSize: '0.75rem', letterSpacing: 0.5 }}>
              View Project
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── 카드 본문 ── */}
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} mb={0.75} color="#1A1A1A" noWrap>
          {project.title}
        </Typography>
        <Typography
          variant="body2" color="#555555" mb={2}
          sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.65 }}
        >
          {project.description}
        </Typography>

        {/* 기술 칩 */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {project.tech_stack?.map(tag => (
            <Chip key={tag} label={tag} size="small"
              sx={{ bgcolor: '#EDE7E1', color: '#8B1A2F', fontWeight: 600, fontSize: '0.7rem', height: 22 }}
            />
          ))}
        </Box>

        {project.created_at && (
          <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 1.5 }}>
            {new Date(project.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
          </Typography>
        )}
      </CardContent>

      {/* ── 버튼 영역 ── */}
      <CardActions
        className="card-actions"
        sx={{
          px: 2.5, pb: 2, gap: 0.5,
          borderTop: '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        {project.detail_url && (
          <Button
            size="small" variant="contained"
            startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            href={project.detail_url} target="_blank" rel="noopener noreferrer"
            sx={{
              bgcolor: '#8B1A2F', color: '#F7F3EF', fontSize: '0.75rem', px: 1.5,
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.25s ease',
              '&::before': {
                content: '""', position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0s',
              },
              '@media (hover: hover)': {
                '&:hover': { bgcolor: '#6B1D35' },
                '&:hover::before': {
                  transform: 'translateX(100%)',
                  transition: 'transform 0.5s ease',
                },
              },
              '&:active': { transform: 'scale(0.96)' },
            }}
          >
            Live Demo
          </Button>
        )}

        {project.github_url && (
          <Button
            size="small" variant="outlined"
            startIcon={<GitHubIcon sx={{ fontSize: 14 }} />}
            href={project.github_url} target="_blank" rel="noopener noreferrer"
            sx={{
              borderColor: '#1C0A14', color: '#1C0A14', fontSize: '0.75rem', px: 1.5,
              transition: 'all 0.25s ease',
              '@media (hover: hover)': {
                '&:hover': { bgcolor: '#1C0A14', color: '#F2EDE8' },
              },
              '&:active': { transform: 'scale(0.96)' },
            }}
          >
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

// ─── 스켈레톤 ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={400} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} />
        <Skeleton variant="text" /><Skeleton variant="text" width="60%" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={60} height={22} />
          <Skeleton variant="rounded" width={60} height={22} />
          <Skeleton variant="rounded" width={60} height={22} />
        </Box>
      </CardContent>
    </Card>
  )
}

// ─── 페이지 컴포넌트 ──────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })

      if (error) { setError(error.message) }
      else        { setProjects(data) }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#EDE7E1', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">

        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography variant="overline" sx={{ color: '#8B1A2F', letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            My Works
          </Typography>
          <Divider sx={{ width: 60, height: 3, bgcolor: '#8B1A2F', mx: 'auto', my: 3, border: 'none' }} />
          <Typography variant="body1" sx={{ color: '#555555', maxWidth: 500, mx: 'auto' }}>
            직접 기획하고 개발한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 에러 */}
        {error && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="error">데이터를 불러오는데 실패했습니다: {error}</Typography>
          </Box>
        )}

        {/* 카드 그리드 */}
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}><SkeletonCard /></Grid>
              ))
            : projects.map(project => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))
          }
        </Grid>

        {/* 빈 상태 */}
        {!loading && !error && projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: '#888' }}>등록된 프로젝트가 없습니다.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}
