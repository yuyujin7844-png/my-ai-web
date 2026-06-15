import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { usePortfolio } from '../context/PortfolioContext'
import SkillIcon from '../components/SkillIcon'

const C = {
  bg:          '#F2EDE8',
  card:        '#F7F3EF',
  accent:      '#8B1A2F',
  accentLight: '#B5253E',
  dark:        '#1A1A1A',
  mid:         '#555555',
  light:       '#888888',
  border:      '#D9D0C8',
}

function getLevel(pct) {
  if (pct >= 85) return { label: '상급',   color: '#8B1A2F' }
  if (pct >= 70) return { label: '중급',   color: '#B5253E' }
  if (pct >= 50) return { label: '초중급', color: '#888888' }
  return               { label: '학습 중', color: '#AAAAAA' }
}

// ─── React.memo: skill.level 변경 시만 리렌더 ────────
const SkillCard = memo(function SkillCard({ skill, index }) {
  const lv = getLevel(skill.level)
  return (
    <Fade in timeout={400 + index * 120}>
      <Box
        sx={{
          bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 2.5,
          p: 3, textAlign: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 8px 24px ${skill.color}25` },
        }}
        role="article"
        aria-label={`${skill.name} ${skill.level}% ${lv.label}`}
      >
        <Box sx={{ width: 56, height: 56, borderRadius: 2, mx: 'auto', mb: 1.5, bgcolor: C.bg, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${skill.color}30` }}>
          <SkillIcon name={skill.name} color={skill.color} size={28} />
        </Box>

        <Typography variant="body2" fontWeight={700} color={C.dark} mb={0.5}>
          {skill.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: lv.color, fontWeight: 700 }}>{lv.label}</Typography>
          <Typography variant="caption" sx={{ color: C.accent, fontWeight: 700 }}>{skill.level}%</Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={skill.level}
          aria-label={`${skill.name} 숙련도`}
          sx={{
            height: 5, borderRadius: 4, bgcolor: C.border,
            '& .MuiLinearProgress-bar': {
              bgcolor: skill.color, borderRadius: 4,
              transition: 'transform 0.3s ease',
            },
          }}
        />
      </Box>
    </Fade>
  )
})

export default function SkillSection() {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()
  const { skills } = homeData   // useMemo로 캐싱된 값 (불필요한 재계산 없음)

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: C.bg, textAlign: 'center' }} aria-label="주요 스킬 섹션">
      <Container maxWidth="lg">

        <Typography variant="overline" sx={{ color: C.accentLight, letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}>
          SKILLS
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
          주요 스킬
        </Typography>
        <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', my: 3, border: 'none' }} />
        <Typography variant="body1" sx={{ color: C.mid, mb: 6 }}>
          About Me 탭 스킬 슬라이더 조정 시 레벨이 즉시 반영됩니다
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }} role="list">
          {skills.map((skill, i) => (
            <Grid item xs={6} sm={4} md={3} key={skill.id} role="listitem">
              <SkillCard skill={skill} index={i} />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="outlined" size="large" endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/about')}
          aria-label="About Me 페이지에서 전체 스킬 보기"
          sx={{ borderColor: C.accent, color: C.accent, px: 5, py: 1.5, fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: C.accent, color: '#fff' } }}
        >
          전체 스킬 보기
        </Button>

      </Container>
    </Box>
  )
}
