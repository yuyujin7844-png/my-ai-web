import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
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

export default function AboutSection() {
  const navigate = useNavigate()
  const { getHomeData } = usePortfolio()
  const { basicInfo, content, skills } = getHomeData()

  const hasContent = content.some(c => c.summary)

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: C.bg }}>
      <Container maxWidth="lg">

        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography variant="overline" sx={{ color: C.accentLight, letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}>
            ABOUT ME
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700 }}>
            내 소개
          </Typography>
          <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', my: 3, border: 'none' }} />
        </Box>

        {/* 메인 레이아웃: 사이드(프로필) + 메인 콘텐츠 */}
        <Grid container spacing={4} alignItems="flex-start">

          {/* ── 왼쪽: 프로필 카드 ── */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 3,
                p: 3, textAlign: 'center',
                position: { md: 'sticky' }, top: { md: 24 },
              }}
            >
              {/* 아바타 */}
              <Avatar
                src={basicInfo.photo}
                sx={{
                  width: 100, height: 100, mx: 'auto', mb: 2,
                  bgcolor: '#1C0A14', border: `3px solid ${C.accent}`,
                  fontSize: '2.5rem', fontWeight: 700, color: '#F2EDE8',
                }}
              >
                {basicInfo.name.charAt(0)}
              </Avatar>

              {/* 이름 */}
              <Typography variant="h6" fontWeight={700} color={C.dark} mb={0.5}>
                {basicInfo.name}
              </Typography>

              {/* 뱃지 */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                <Chip label={basicInfo.role}       size="small" sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, fontSize: '0.72rem' }} />
                <Chip label={basicInfo.experience} size="small" sx={{ bgcolor: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}40`, fontWeight: 600, fontSize: '0.72rem' }} />
              </Box>

              <Divider sx={{ borderColor: C.border, mb: 2 }} />

              {/* 인트로 */}
              <Typography variant="body2" sx={{ color: C.mid, lineHeight: 1.8, mb: 2.5, fontSize: '0.85rem' }}>
                {basicInfo.intro}
              </Typography>

              {/* 주요 스킬 아이콘 */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                {skills.map(skill => (
                  <Tooltip key={skill.id} title={`${skill.name} ${skill.level}%`} arrow>
                    <Box
                      sx={{
                        width: 40, height: 40, borderRadius: 2,
                        bgcolor: C.bg, border: `1px solid ${C.border}`,
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
          </Grid>

          {/* ── 오른쪽: 내 이야기 콘텐츠 ── */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {hasContent ? (
                content.map(item => (
                  <Box
                    key={item.id}
                    sx={{
                      bgcolor: C.card, border: `1px solid ${C.border}`,
                      borderLeft: `4px solid ${C.accent}`, borderRadius: 2, p: 3,
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: '0 4px 16px rgba(139,26,47,0.1)' },
                    }}
                  >
                    <Typography variant="overline" sx={{ color: C.accentLight, letterSpacing: 2, fontSize: '0.72rem', display: 'block', mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: C.mid, lineHeight: 1.9 }}>
                      {item.summary}
                    </Typography>
                  </Box>
                ))
              ) : (
                /* 내용 없을 때 안내 메시지 */
                <Box
                  sx={{
                    bgcolor: C.card, border: `2px dashed ${C.border}`, borderRadius: 3,
                    p: 4, textAlign: 'center',
                  }}
                >
                  <EditOutlinedIcon sx={{ color: C.border, fontSize: 40, mb: 1.5 }} />
                  <Typography variant="body1" fontWeight={600} color={C.light} mb={1}>
                    아직 소개 내용이 없습니다
                  </Typography>
                  <Typography variant="body2" sx={{ color: C.light, mb: 2.5, lineHeight: 1.8 }}>
                    About Me 탭의 <Box component="span" sx={{ color: C.accent, fontWeight: 700 }}>"내 이야기"</Box> 섹션에서
                    내용을 입력하면 여기에 자동으로 표시됩니다.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => navigate('/about')}
                    sx={{ borderColor: C.accent, color: C.accent, '&:hover': { bgcolor: C.accent, color: '#fff' } }}
                  >
                    내용 입력하러 가기
                  </Button>
                </Box>
              )}

              {/* 더 알아보기 버튼 */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/about')}
                  sx={{
                    bgcolor: C.accent, color: '#fff', px: 4, py: 1.2,
                    fontWeight: 600, borderRadius: 2,
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

