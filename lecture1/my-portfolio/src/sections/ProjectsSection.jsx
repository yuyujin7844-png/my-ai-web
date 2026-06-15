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
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import supabase from '../lib/supabase'

const C = {
  bg:     '#EDE7E1',
  card:   '#F7F3EF',
  accent: '#8B1A2F',
  dark:   '#1A1A1A',
  mid:    '#555555',
  border: '#D9D0C8',
}

// ─── 프로젝트 카드 ────────────────────────────────────
// 호버: 카드 부상 + 이미지 줌·필터 + 오버레이 정보 슬라이드업
function PreviewCard({ project }) {
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
          // 카드 부상
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 28px 56px rgba(28,10,20,0.22), 0 8px 16px rgba(28,10,20,0.12)',
          },
          // 이미지: 줌 + 채도/밝기 필터
          '&:hover .thumb-img': {
            transform: 'scale(1.08)',
            filter: 'brightness(0.72) saturate(1.15)',
          },
          // 오버레이: 페이드인 + 슬라이드업
          '&:hover .thumb-overlay': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          // 기술 칩: 슬라이드업
          '&:hover .chip-row': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        // 터치 피드백
        '&:active': { transform: 'translateY(-4px)' },
      }}
    >
      {/* ── 썸네일 + 오버레이 ── */}
      <Box sx={{ height: 320, bgcolor: '#1C0A14', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
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
              transition: 'transform 0.48s ease, filter 0.48s ease',
            }}
          />
        )}

        {/* 오버레이: 그라데이션 + 프로젝트 정보 */}
        <Box
          className="thumb-overlay"
          aria-hidden="true"
          sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(28,10,20,0.95) 0%, rgba(28,10,20,0.45) 50%, transparent 100%)',
            opacity: 0,
            transform: 'translateY(6px)',
            transition: 'opacity 0.38s ease, transform 0.38s ease',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            p: 2.5,
          }}
        >
          <Typography sx={{ color: '#F2EDE8', fontWeight: 700, fontSize: '1.05rem', mb: 0.5, lineHeight: 1.3 }}>
            {project.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <OpenInNewIcon sx={{ color: 'rgba(242,237,232,0.65)', fontSize: 13 }} />
            <Typography sx={{ color: 'rgba(242,237,232,0.65)', fontSize: '0.75rem', letterSpacing: 0.3 }}>
              자세히 보기
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── 카드 콘텐츠 ── */}
      <CardContent sx={{ flexGrow: 1, textAlign: 'left', p: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={0.5} color={C.dark} noWrap
          sx={{ fontSize: '0.95rem' }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2" color={C.mid} mb={1.5}
          sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.82rem', lineHeight: 1.6 }}
        >
          {project.description}
        </Typography>

        {/* 기술 칩 */}
        <Box
          className="chip-row"
          sx={{
            display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1.5,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
          }}
        >
          {project.tech_stack?.slice(0, 3).map(tag => (
            <Chip
              key={tag} label={tag} size="small"
              sx={{ bgcolor: '#EDE7E1', color: C.accent, fontWeight: 600, fontSize: '0.7rem', height: 22 }}
            />
          ))}
        </Box>

        {project.detail_url && (
          <Button
            size="small" variant="outlined"
            startIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
            href={project.detail_url}
            target="_blank" rel="noopener noreferrer"
            sx={{
              borderColor: C.accent, color: C.accent, fontSize: '0.72rem', px: 1.5, py: 0.5,
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.25s ease',
              '&::before': {
                content: '""', position: 'absolute', inset: 0,
                bgcolor: C.accent, transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.25s ease', zIndex: 0,
              },
              '& > *': { position: 'relative', zIndex: 1 },
              '@media (hover: hover)': {
                '&:hover': { color: '#F7F3EF', borderColor: C.accent },
                '&:hover::before': { transform: 'scaleX(1)' },
              },
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            Live Demo
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ─── 스켈레톤 ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={320} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} />
        <Skeleton variant="text" /><Skeleton variant="text" width="60%" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={60} height={22} />
          <Skeleton variant="rounded" width={60} height={22} />
        </Box>
      </CardContent>
    </Card>
  )
}

// ─── 메인 섹션 ────────────────────────────────────────
export default function ProjectsSection() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)

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
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: C.bg, textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: C.accent, letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}>
          PROJECTS
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
          My Works
        </Typography>
        <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', my: 3, border: 'none' }} />
        <Typography variant="body1" sx={{ color: C.mid, mb: 6 }}>
          직접 기획하고 개발한 대표 프로젝트들입니다.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}><SkeletonCard /></Grid>
              ))
            : projects.map(project => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <PreviewCard project={project} />
                </Grid>
              ))
          }
        </Grid>

        <Button
          variant="outlined" size="large"
          onClick={() => navigate('/projects')}
          sx={{
            borderColor: C.accent, color: C.accent,
            px: 5, py: 1.5, fontWeight: 600, borderRadius: 2,
            transition: 'all 0.25s ease',
            '@media (hover: hover)': {
              '&:hover': { bgcolor: C.accent, color: '#F7F3EF' },
            },
            '&:active': { transform: 'scale(0.97)' },
          }}
        >
          더 보기 →
        </Button>
      </Container>
    </Box>
  )
}
