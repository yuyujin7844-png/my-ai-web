import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SyncIcon from '@mui/icons-material/Sync'
import { usePortfolio } from '../context/PortfolioContext'
import SkillIcon from '../components/SkillIcon'

const C = {
  bg:          '#EDE7E1',
  card:        '#F7F3EF',
  accent:      '#8B1A2F',
  accentLight: '#B5253E',
  dark:        '#1A1A1A',
  mid:         '#555555',
  light:       '#888888',
  border:      '#D9D0C8',
}

// ─── 프로필 카드 ─────────────────────────────────────
// MUI sx 자체의 반응형 객체를 사용 → useMediaQuery 없이 처리
const ProfileCard = memo(function ProfileCard({ basicInfo, skills }) {
  return (
    <Box
      sx={{
        bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 3,
        p: { xs: 2.5, sm: 3 }, textAlign: 'center',
        // 데스크탑에서만 sticky (모바일 스크롤 방해 방지)
        position: { md: 'sticky' }, top: { md: 24 },
      }}
    >
      {/* 아바타: 모바일 80 → 태블릿 90 → 데스크탑 100 */}
      <Avatar
        src={basicInfo.photo}
        alt={`${basicInfo.name} 프로필 사진`}
        imgProps={{ loading: 'lazy' }}
        sx={{
          width:  { xs: 80, sm: 90, md: 100 },
          height: { xs: 80, sm: 90, md: 100 },
          mx: 'auto', mb: { xs: 1.5, md: 2 },
          bgcolor: '#1C0A14', border: `3px solid ${C.accent}`,
          fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
          fontWeight: 700, color: '#F2EDE8',
        }}
      >
        {basicInfo.name.charAt(0)}
      </Avatar>

      <Typography variant="h6" fontWeight={700} color={C.dark} mb={0.5}
        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
      >
        {basicInfo.name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: { xs: 1.5, md: 2 } }}>
        <Chip label={basicInfo.role}       size="small" sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, fontSize: '0.72rem' }} />
        <Chip label={basicInfo.experience} size="small" sx={{ bgcolor: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}40`, fontWeight: 600, fontSize: '0.72rem' }} />
      </Box>

      <Divider sx={{ borderColor: C.border, mb: { xs: 1.5, md: 2 } }} />

      <Typography variant="body2" sx={{ color: C.mid, lineHeight: 1.8, mb: { xs: 2, md: 2.5 }, fontSize: { xs: '0.82rem', md: '0.85rem' } }}>
        {basicInfo.intro}
      </Typography>

      {/* 스킬 아이콘: 모바일 44px (터치 최소), 데스크탑 40px */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }} role="list" aria-label="주요 스킬">
        {skills.map(skill => (
          <Tooltip key={skill.id} title={`${skill.name} ${skill.level}%`} arrow>
            <Box
              role="listitem"
              aria-label={`${skill.name} ${skill.level}%`}
              sx={{
                width:  { xs: 44, md: 40 },
                height: { xs: 44, md: 40 },
                borderRadius: 2, bgcolor: C.bg, border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 6px ${skill.color}25`,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' },
              }}
            >
              <SkillIcon name={skill.name} color={skill.color} size={20} />
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
})

// ─── 콘텐츠 카드 ─────────────────────────────────────
const ContentCard = memo(function ContentCard({ item, index }) {
  return (
    <Fade in timeout={400 + index * 100}>
      <Box
        sx={{
          bgcolor: C.card, border: `1px solid ${C.border}`,
          borderLeft: `4px solid ${C.accent}`, borderRadius: 2,
          p: { xs: 2.5, md: 3 },
          transition: 'box-shadow 0.2s',
          '&:hover': { boxShadow: '0 4px 16px rgba(139,26,47,0.1)' },
        }}
      >
        <Typography variant="overline" sx={{ color: C.accentLight, letterSpacing: 2, fontSize: { xs: '0.68rem', md: '0.72rem' }, display: 'block', mb: 0.5 }}>
          {item.title}
        </Typography>
        <Typography variant="body1" sx={{ color: C.mid, lineHeight: { xs: 1.8, md: 1.9 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
          {item.summary}
        </Typography>
      </Box>
    </Fade>
  )
})

// ─── 메인 컴포넌트 ────────────────────────────────────
export default function AboutSection() {
  const navigate = useNavigate()
  const theme    = useTheme()

  // 브레이크포인트 감지
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))   // < 600px

  const { homeData, lastModified } = usePortfolio()
  const { basicInfo, content, skills } = homeData

  const hasContent = content.some(c => c.summary)
  const isRecentlyUpdated = lastModified && (Date.now() - lastModified < 30_000)

  return (
    <Box
      component="section"
      aria-label="내 소개 섹션"
      sx={{ py: { xs: 6, sm: 8, md: 12 }, bgcolor: C.bg }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>

        {/* ── 섹션 헤더 ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{ color: C.accentLight, letterSpacing: { xs: 2, md: 4 }, fontSize: { xs: '0.7rem', md: '0.8rem' }, mb: 1, display: 'block' }}
          >
            ABOUT ME
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.5rem' }, fontWeight: 700 }}
            >
              내 소개
            </Typography>
            {isRecentlyUpdated && (
              <Fade in>
                <Chip
                  icon={<SyncIcon sx={{ fontSize: '14px !important' }} />}
                  label="방금 업데이트"
                  size="small"
                  sx={{ bgcolor: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}30`, fontWeight: 600, fontSize: '0.7rem' }}
                />
              </Fade>
            )}
          </Box>

          <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', my: { xs: 2, md: 3 }, border: 'none' }} />
        </Box>

        {/* ── 메인 레이아웃 ── */}
        <Grid container spacing={{ xs: 3, sm: 3, md: 4 }} alignItems="flex-start">

          {/* 프로필 카드 */}
          <Grid item xs={12} md={4}>
            <ProfileCard basicInfo={basicInfo} skills={skills} />
          </Grid>

          {/* 내 이야기 콘텐츠 */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
              {hasContent ? (
                content.map((item, i) =>
                  item.summary ? <ContentCard key={item.id} item={item} index={i} /> : null
                )
              ) : (
                <Fade in timeout={400}>
                  <Box
                    sx={{
                      bgcolor: C.card, border: `2px dashed ${C.border}`, borderRadius: 3,
                      p: { xs: 3, md: 4 }, textAlign: 'center',
                    }}
                  >
                    <EditOutlinedIcon sx={{ color: C.border, fontSize: { xs: 36, md: 40 }, mb: 1.5 }} />
                    <Typography variant="body1" fontWeight={600} color={C.light} mb={1}
                      sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
                    >
                      아직 소개 내용이 없습니다
                    </Typography>
                    <Typography variant="body2" sx={{ color: C.light, mb: 2.5, lineHeight: 1.8, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                      About Me 탭의{' '}
                      <Box component="span" sx={{ color: C.accent, fontWeight: 700 }}>"내 이야기"</Box>
                      {' '}섹션에서 내용을 입력하면 여기에 자동으로 표시됩니다.
                    </Typography>
                    {/* 모바일: 전체 너비 버튼 */}
                    <Button
                      variant="outlined" size="small" startIcon={<EditOutlinedIcon />}
                      onClick={() => navigate('/about')}
                      fullWidth={isMobile}
                      sx={{
                        borderColor: C.accent, color: C.accent,
                        py: { xs: 1.2, md: 1 },
                        '&:hover': { bgcolor: C.accent, color: '#fff' },
                      }}
                    >
                      내용 입력하러 가기
                    </Button>
                  </Box>
                </Fade>
              )}

              {/* 더 알아보기 버튼 */}
              <Box
                sx={{
                  display: 'flex',
                  // 모바일: 전체 너비 가운데 정렬 / 태블릿+: 오른쪽 정렬
                  justifyContent: { xs: 'stretch', sm: 'flex-end' },
                  mt: 1,
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/about')}
                  aria-label="About Me 페이지로 이동"
                  fullWidth={isMobile}
                  sx={{
                    bgcolor: C.accent, color: '#fff',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.4, md: 1.2 }, // 모바일 44px 터치 확보
                    fontWeight: 600, borderRadius: 2,
                    fontSize: { xs: '0.9rem', md: '0.875rem' },
                    '&:hover': { bgcolor: '#6B1D35' },
                  }}
                >
                  더 알아보기
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Box>
  )
}
