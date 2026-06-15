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
import Tooltip from '@mui/material/Tooltip'
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
  if (pct >= 85) return { label: '상급',   desc: '실무 단독 수행 가능', color: '#8B1A2F' }
  if (pct >= 70) return { label: '중급',   desc: '대부분 단독 수행',    color: '#B5253E' }
  if (pct >= 50) return { label: '초중급', desc: '기본 기능 숙지',      color: '#888888' }
  return               { label: '학습 중', desc: '기초 수준',           color: '#AAAAAA' }
}

// ─── 스킬 카드 ────────────────────────────────────────
// 호버: 카드 부상 + 아이콘 회전·글로우 + 프로그레스 바 강조
const SkillCard = memo(function SkillCard({ skill, index }) {
  const lv = getLevel(skill.level)
  return (
    <Fade in timeout={400 + index * 120}>
      <Tooltip
        title={`${skill.name} — ${lv.label} · ${lv.desc}`}
        arrow
        placement="top"
      >
        <Box
          role="article"
          aria-label={`${skill.name} ${skill.level}% ${lv.label}`}
          tabIndex={0}
          sx={{
            bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 2.5,
            p: 3, textAlign: 'center',

            // GPU 레이어 힌트
            willChange: 'transform',
            // 스프링 곡선: 자연스러운 탄성 효과
            transition: [
              'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
              'box-shadow 0.3s ease',
              'border-color 0.3s ease',
            ].join(', '),

            // ── 데스크탑 hover 전용 (@media hover:hover) ──
            '@media (hover: hover)': {
              '&:hover': {
                transform: 'translateY(-10px) scale(1.02)',
                boxShadow: `0 20px 48px ${skill.color}30, 0 0 0 1px ${skill.color}25`,
                borderColor: `${skill.color}45`,
              },
              // 아이콘 컨테이너: 회전 + 글로우 (부모 hover 시 자식 CSS 클래스 타겟)
              '&:hover .skill-icon-wrap': {
                transform: 'rotate(10deg) scale(1.14)',
                boxShadow: `0 0 28px ${skill.color}60, 0 6px 16px ${skill.color}30`,
                borderColor: `${skill.color}70`,
                bgcolor: C.card,
              },
              // 프로그레스 바 밝기 강조
              '&:hover .skill-progress .MuiLinearProgress-bar': {
                filter: 'brightness(1.3) saturate(1.2)',
              },
              // 레벨 텍스트 강조
              '&:hover .skill-level-label': {
                letterSpacing: '0.5px',
              },
            },
            // 터치 피드백
            '&:active': { transform: 'translateY(-3px) scale(0.99)' },
            '&:focus-visible': { outline: `2px solid ${skill.color}`, outlineOffset: 3 },
          }}
        >
          {/* 아이콘 컨테이너: will-change로 GPU 가속 */}
          <Box
            className="skill-icon-wrap"
            sx={{
              width: 56, height: 56, borderRadius: 2,
              mx: 'auto', mb: 1.5,
              bgcolor: C.bg, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${skill.color}25`,
              willChange: 'transform, box-shadow',
              transition: [
                'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'box-shadow 0.3s ease',
                'border-color 0.28s ease',
                'background-color 0.2s ease',
              ].join(', '),
            }}
          >
            <SkillIcon name={skill.name} color={skill.color} size={28} />
          </Box>

          {/* 이름 */}
          <Typography
            variant="body2" fontWeight={700} color={C.dark} mb={0.5}
            sx={{ transition: 'color 0.2s' }}
          >
            {skill.name}
          </Typography>

          {/* 레벨 뱃지 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, mb: 1.5 }}>
            <Typography
              className="skill-level-label"
              variant="caption"
              sx={{ color: lv.color, fontWeight: 700, transition: 'letter-spacing 0.3s ease' }}
            >
              {lv.label}
            </Typography>
            <Typography variant="caption" sx={{ color: C.accent, fontWeight: 700 }}>
              {skill.level}%
            </Typography>
          </Box>

          {/* 프로그레스 바 */}
          <LinearProgress
            className="skill-progress"
            variant="determinate"
            value={skill.level}
            aria-label={`${skill.name} 숙련도`}
            sx={{
              height: 5, borderRadius: 4, bgcolor: C.border,
              '& .MuiLinearProgress-bar': {
                bgcolor: skill.color, borderRadius: 4,
                transition: 'transform 0.3s ease, filter 0.3s ease',
              },
            }}
          />
        </Box>
      </Tooltip>
    </Fade>
  )
})

export default function SkillSection() {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()
  const { skills } = homeData

  return (
    <Box
      component="section"
      aria-label="주요 스킬 섹션"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: C.bg, textAlign: 'center' }}
    >
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: C.accentLight, letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}>
          SKILLS
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
          주요 스킬
        </Typography>
        <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', my: 3, border: 'none' }} />
        <Typography variant="body1" sx={{ color: C.mid, mb: 6 }}>
          카드에 마우스를 올려보세요
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }} role="list">
          {skills.map((skill, i) => (
            <Grid item xs={6} sm={4} md={3} key={skill.id} role="listitem">
              <SkillCard skill={skill} index={i} />
            </Grid>
          ))}
        </Grid>

        {/* 전체 스킬 보기 버튼 */}
        <Button
          variant="outlined" size="large" endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/about')}
          aria-label="About Me 페이지에서 전체 스킬 보기"
          sx={{
            borderColor: C.accent, color: C.accent,
            px: 5, py: 1.5, fontWeight: 600, borderRadius: 2,
            position: 'relative', overflow: 'hidden',
            transition: 'all 0.3s ease',
            // 채움 애니메이션 (border → fill)
            '&::before': {
              content: '""',
              position: 'absolute', inset: 0,
              bgcolor: C.accent,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.3s ease',
              zIndex: 0,
            },
            '& .MuiButton-endIcon, & .MuiButton-label': { position: 'relative', zIndex: 1 },
            '@media (hover: hover)': {
              '&:hover': { color: '#fff', borderColor: C.accent },
              '&:hover::before': { transform: 'scaleX(1)' },
              '&:hover .MuiSvgIcon-root': { transform: 'translateX(4px)', transition: 'transform 0.3s ease' },
            },
            '&:active': { transform: 'scale(0.98)' },
          }}
        >
          전체 스킬 보기
        </Button>
      </Container>
    </Box>
  )
}
