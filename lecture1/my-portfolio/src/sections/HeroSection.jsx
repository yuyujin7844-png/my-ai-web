import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { SiGithub, SiInstagram } from 'react-icons/si'
import SkillIcon from '../components/SkillIcon'

// ─── 애니메이션 키프레임 ──────────────────────────────
const fadeInUp    = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}`
const fadeInDown  = keyframes`from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}`
const fadeInRight = keyframes`from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:none}`
const blink       = keyframes`50%{opacity:0}`
const spin        = keyframes`to{transform:rotate(360deg)}`
const bounce      = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}`
const pulse       = keyframes`0%,100%{opacity:1;box-shadow:0 0 8px #4CAF50}50%{opacity:.4;box-shadow:0 0 3px #4CAF50}`

// ─── 상수 ─────────────────────────────────────────────
const ROLES  = ['웹디자이너', 'UI 디자이너', '브랜드 경험 설계자']
const SKILLS = [
  { name: 'Figma',       color: '#F24E1E' },
  { name: 'Photoshop',   color: '#31A8FF' },
  { name: 'Illustrator', color: '#FF9A00' },
]
const SOCIAL_LINKS = [
  { icon: SiGithub,    href: 'https://github.com/yuyujin7844-png', label: 'GitHub',          active: true  },
  { icon: SiInstagram, href: '#',                                   label: 'Instagram (준비 중)', active: false },
]

// ─── 도형 패턴 SVG ───────────────────────────────────
const _geo = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
  <circle cx='22'  cy='22'  r='4'   fill='rgba(242,237,232,0.08)'/>
  <circle cx='120' cy='72'  r='15'  fill='none' stroke='rgba(242,237,232,0.055)' stroke-width='1.2'/>
  <circle cx='192' cy='158' r='6'   fill='rgba(242,237,232,0.065)'/>
  <circle cx='54'  cy='182' r='10'  fill='none' stroke='rgba(242,237,232,0.06)'  stroke-width='1'/>
  <circle cx='208' cy='38'  r='2.5' fill='rgba(242,237,232,0.1)'/>
  <circle cx='165' cy='225' r='7'   fill='none' stroke='rgba(242,237,232,0.05)'  stroke-width='1'/>
  <rect x='84'  y='6'   width='18' height='18' fill='none'                    stroke='rgba(242,237,232,0.06)'  stroke-width='1.2' transform='rotate(45,93,15)'/>
  <rect x='168' y='56'  width='9'  height='9'  fill='rgba(242,237,232,0.07)'                                                     transform='rotate(20,172,61)'/>
  <rect x='26'  y='106' width='22' height='22' fill='none'                    stroke='rgba(242,237,232,0.05)'  stroke-width='1'   transform='rotate(12,37,117)'/>
  <rect x='146' y='196' width='11' height='11' fill='none'                    stroke='rgba(242,237,232,0.07)'  stroke-width='1'   transform='rotate(33,151,202)'/>
  <rect x='70'  y='136' width='7'  height='7'  fill='rgba(242,237,232,0.065)'                                                    transform='rotate(45,73,140)'/>
  <rect x='218' y='120' width='13' height='13' fill='none'                    stroke='rgba(242,237,232,0.05)'  stroke-width='1'   transform='rotate(25,224,126)'/>
  <polygon points='144,36  162,66  126,66'  fill='none'                  stroke='rgba(242,237,232,0.06)'  stroke-width='1.2'/>
  <polygon points='224,96  234,114 214,114' fill='rgba(242,237,232,0.055)'/>
  <polygon points='38,46   58,78   18,78'   fill='none'                  stroke='rgba(242,237,232,0.05)'  stroke-width='1'/>
  <polygon points='178,150 194,176 162,176' fill='none'                  stroke='rgba(242,237,232,0.07)'  stroke-width='1'/>
  <polygon points='82,216  91,234  73,234'  fill='rgba(242,237,232,0.065)'/>
  <polygon points='232,200 224,218 240,218' fill='none'                  stroke='rgba(242,237,232,0.05)'  stroke-width='1'/>
</svg>`
const GEO_BG = `url("data:image/svg+xml,${encodeURIComponent(_geo)}")`

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── 스킬 뱃지 ───────────────────────────────────────
function SkillBadge({ name, color }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 1.5, py: 0.7, borderRadius: 10, bgcolor: 'rgba(20,6,14,0.88)', border: `1px solid ${color}45`, backdropFilter: 'blur(8px)', boxShadow: `0 4px 14px rgba(0,0,0,0.35), 0 0 0 1px ${color}20`, whiteSpace: 'nowrap' }}>
      <SkillIcon name={name} color={color} size={13} />
      <Typography sx={{ color: '#F2EDE8', fontWeight: 700, fontSize: '0.68rem', letterSpacing: 0.3 }}>
        {name}
      </Typography>
    </Box>
  )
}

// ─── 우측 장식 원 (데스크탑 전용) ────────────────────
function DecoCircle({ size = 340 }) {
  const r = size / 2
  return (
    <Box sx={{ position: 'relative', width: size, height: size, mx: 'auto', animation: `${fadeInRight} 0.9s ease 0.7s both`, flexShrink: 0 }}>
      {/* 바깥 링: 느리게 회전 + 점 4개 */}
      <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(242,237,232,0.18)', animation: `${spin} 40s linear infinite` }}>
        {[0, 90, 180, 270].map(angle => (
          <Box key={angle} sx={{ position: 'absolute', top: '50%', left: '50%', width: 7, height: 7, mt: '-3.5px', ml: '-3.5px', borderRadius: '50%', bgcolor: angle === 0 ? '#8B1A2F' : 'rgba(242,237,232,0.22)', boxShadow: angle === 0 ? '0 0 8px #8B1A2F' : 'none', transform: `rotate(${angle}deg) translateY(-${r}px)` }} />
        ))}
      </Box>
      {/* 중간 링 */}
      <Box sx={{ position: 'absolute', inset: Math.round(size * 0.13), borderRadius: '50%', border: '1px solid rgba(242,237,232,0.09)' }} />
      {/* 안쪽 메인 원 */}
      <Box sx={{ position: 'absolute', inset: Math.round(size * 0.253), borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #3D1526 0%, #1C0A14 100%)', border: '1.5px solid rgba(242,237,232,0.22)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(139,26,47,0.35), inset 0 0 30px rgba(107,29,53,0.2)' }}>
        <Typography sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: `${size * 0.088}px`, fontWeight: 800, color: '#F2EDE8', lineHeight: 1, letterSpacing: '-2px' }}>
          YJ
        </Typography>
        <Typography sx={{ color: 'rgba(242,237,232,0.35)', fontSize: '0.58rem', letterSpacing: 4, fontWeight: 600, mt: 0.8 }}>
          DESIGNER
        </Typography>
      </Box>
      {/* 스킬 뱃지 */}
      <Box sx={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}><SkillBadge name="Figma" color="#F24E1E" /></Box>
      <Box sx={{ position: 'absolute', bottom: Math.round(size * 0.08), right: -8 }}><SkillBadge name="Photoshop" color="#31A8FF" /></Box>
      <Box sx={{ position: 'absolute', bottom: Math.round(size * 0.08), left: -8 }}><SkillBadge name="Illustrator" color="#FF9A00" /></Box>
    </Box>
  )
}

// ─── 메인 컴포넌트 ────────────────────────────────────
export default function HeroSection() {
  const navigate   = useNavigate()
  const theme      = useTheme()

  // ── 브레이크포인트 ──
  // isMobile:  < 600px  (스마트폰 세로)
  // isTablet:  600~899px (스마트폰 가로 + 소형 태블릿)
  // isDesktop: 900px+   (태블릿 가로 + 데스크탑)
  const isMobile  = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet  = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // 타이핑 효과 상태
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase,     setPhase]     = useState('typing')

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timer
    if (phase === 'typing') {
      timer = displayed.length < current.length
        ? setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 110)
        : setTimeout(() => setPhase('deleting'), 2200)
    } else {
      timer = displayed.length > 0
        ? setTimeout(() => setDisplayed(displayed.slice(0, -1)), 65)
        : (() => { setRoleIdx(p => (p + 1) % ROLES.length); setPhase('typing'); return undefined })()
    }
    return () => clearTimeout(timer)
  }, [displayed, phase, roleIdx])

  return (
    <Box
      component="section"
      aria-label="포트폴리오 메인 소개"
      sx={{
        minHeight: '100vh',
        // 모바일: 콘텐츠 위쪽 정렬 (flexStart) → 클리핑 방지
        // 데스크탑: 수직 중앙 정렬
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        position: 'relative', overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 72% 28%, rgba(139,26,47,0.32) 0%, transparent 52%),
          radial-gradient(ellipse at 18% 78%, rgba(61,21,38,0.45) 0%, transparent 48%),
          linear-gradient(158deg, #1C0A14 0%, #3D1526 52%, #6B1D35 100%)
        `,
        '&::before': {
          content: '""',
          position: 'absolute', inset: 0,
          backgroundImage: GEO_BG,
          backgroundRepeat: 'repeat',
          backgroundSize: '240px 240px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          // 브레이크포인트별 상하 패딩
          // 모바일: 충분한 여백 확보 (navbar 아래 + 스크롤 인디케이터 위)
          // 데스크탑: 수직 중앙 정렬이므로 0
          pt: { xs: 9, sm: 8, md: 0 },
          pb: { xs: 10, sm: 9, md: 0 },
          // 좌우 패딩: 모바일 여유 있게
          px: { xs: 2.5, sm: 4, md: 4, lg: 3 },
          position: 'relative', zIndex: 1,
        }}
      >
        <Grid container spacing={{ xs: 4, sm: 4, md: 4, lg: 6 }} alignItems="center">

          {/* ── 왼쪽: 텍스트 콘텐츠 ── */}
          <Grid item xs={12} md={7}>

            {/* Open to Work 배지 */}
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: { xs: 1.5, md: 2 },
                py: { xs: 0.7, md: 0.9 },
                mb: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: 10,
                bgcolor: 'rgba(242,237,232,0.07)',
                border: '1px solid rgba(242,237,232,0.18)',
                backdropFilter: 'blur(8px)',
                animation: `${fadeInDown} 0.6s ease 0.1s both`,
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50', flexShrink: 0, animation: `${pulse} 2s ease-in-out infinite` }} />
              <Typography sx={{ color: '#F2EDE8', fontSize: { xs: '0.72rem', md: '0.78rem' }, fontWeight: 600, letterSpacing: 1 }}>
                Open to Work
              </Typography>
            </Box>

            {/* OVERLINE */}
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: '#B5253E',
                letterSpacing: { xs: 2, md: 4 },
                fontSize: { xs: '0.68rem', md: '0.78rem' },
                mb: { xs: 1, md: 1.5 },
                animation: `${fadeInUp} 0.6s ease 0.3s both`,
              }}
            >
              WELCOME TO MY PORTFOLIO
            </Typography>

            {/* 이름 — Playfair Display */}
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                // 브레이크포인트별 폰트 크기
                // xs (< 600):  2.8rem → 모바일 세로
                // sm (600-899): 3.6rem → 모바일 가로 / 소형 태블릿
                // md (900-1199): 4.5rem → 태블릿
                // lg (1200+):   5.2rem → 데스크탑
                fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.5rem', lg: '5.2rem' },
                fontWeight: 800,
                color: '#F2EDE8',
                lineHeight: 1.05,
                mb: { xs: 1.5, md: 2 },
                letterSpacing: { xs: '-1px', md: '-1.5px' },
                animation: `${fadeInUp} 0.6s ease 0.5s both`,
              }}
            >
              YuJin
            </Typography>

            {/* 타이핑 직함 */}
            <Box
              sx={{
                display: 'flex', alignItems: 'center',
                gap: { xs: 1.5, md: 2 },
                mb: { xs: 2.5, sm: 3, md: 3.5 },
                animation: `${fadeInUp} 0.6s ease 0.7s both`,
              }}
            >
              <Box sx={{ width: { xs: 22, md: 28 }, height: 2.5, borderRadius: 2, bgcolor: '#8B1A2F', flexShrink: 0 }} />
              <Typography
                component="p"
                sx={{
                  color: '#C4B8B0', fontWeight: 400,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.35rem' },
                  minHeight: '1.6em', letterSpacing: 0.3,
                }}
              >
                {displayed}
                <Box component="span" aria-hidden="true" sx={{ display: 'inline-block', width: '2px', height: '1em', bgcolor: '#8B1A2F', ml: 0.3, verticalAlign: 'middle', animation: `${blink} 0.85s step-end infinite` }} />
              </Typography>
            </Box>

            {/* 소개 문구
                모바일: 강제 줄바꿈 제거 → 자연스러운 텍스트 흐름
                태블릿·데스크탑: 줄바꿈 유지 */}
            <Typography
              variant="body1"
              sx={{
                color: '#9A8E88',
                lineHeight: { xs: 1.8, md: 2 },
                fontSize: { xs: '0.88rem', sm: '0.92rem', md: '0.98rem' },
                maxWidth: { xs: '100%', md: 460 },
                mb: { xs: 3, sm: 3.5, md: 4.5 },
                animation: `${fadeInUp} 0.6s ease 0.9s both`,
              }}
            >
              {isMobile
                /* 모바일: 강제 줄바꿈 없이 흐르도록 */
                ? '사용자의 시선이 머무는 순간을 디자인합니다. 작은 디테일 하나 놓치지 않는 섬세함으로, 브랜드의 매력을 웹 공간에 온전히 담아내겠습니다.'
                : (
                  <>
                    사용자의 시선이 머무는 순간을 디자인합니다.
                    <br />
                    작은 디테일 하나 놓치지 않는 섬세함으로,
                    <br />
                    브랜드의 매력을 웹 공간에 온전히 담아내겠습니다.
                  </>
                )
              }
            </Typography>

            {/* ── CTA 버튼 그룹 ── */}
            <Box
              sx={{
                display: 'flex',
                // 모바일: 세로 배치 (세로로 쌓기)
                // 태블릿+: 가로 배치
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, md: 2 },
                mb: { xs: 2.5, md: 3.5 },
                animation: `${fadeInUp} 0.6s ease 1.1s both`,
              }}
            >
              {/* Primary CTA */}
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => scrollToSection('projects')}
                aria-label="프로젝트 섹션으로 스크롤"
                sx={{
                  bgcolor: '#8B1A2F', color: '#F7F3EF',
                  // 모바일: 전체 너비 / 태블릿+: 자동
                  width: { xs: '100%', sm: 'auto' },
                  // 터치 44px 최소 확보: py 1.4 (11.2px) + MUI large 내장 높이 → ~50px
                  px: { xs: 3, md: 4 }, py: { xs: 1.4, md: 1.6 },
                  fontWeight: 700,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  borderRadius: 2, letterSpacing: 0.5,
                  boxShadow: '0 4px 20px rgba(139,26,47,0.4)',
                  transition: 'all 0.25s',
                  '&:hover': { bgcolor: '#B5253E', transform: 'translateY(-3px)', boxShadow: '0 12px 36px rgba(139,26,47,0.6)' },
                  '&:active': { transform: 'translateY(-1px)' },
                }}
              >
                포트폴리오 둘러보기
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<MailOutlineIcon />}
                onClick={() => scrollToSection('contact')}
                aria-label="연락처 섹션으로 스크롤"
                sx={{
                  borderColor: 'rgba(242,237,232,0.32)',
                  color: '#F2EDE8',
                  width: { xs: '100%', sm: 'auto' },
                  px: { xs: 3, md: 4 }, py: { xs: 1.4, md: 1.6 },
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  borderRadius: 2, letterSpacing: 0.5,
                  bgcolor: 'rgba(242,237,232,0.06)',
                  backdropFilter: 'blur(6px)',
                  transition: 'all 0.25s',
                  '&:hover': { borderColor: '#F2EDE8', bgcolor: 'rgba(242,237,232,0.13)', transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' },
                  '&:active': { transform: 'translateY(-1px)' },
                }}
              >
                연락하기
              </Button>
            </Box>

            {/* ── 구분선 ── */}
            <Box
              sx={{
                width: '100%', maxWidth: { xs: '100%', md: 460 },
                height: '1px', bgcolor: 'rgba(242,237,232,0.1)',
                mb: { xs: 2, md: 3 },
                animation: `${fadeInUp} 0.6s ease 1.2s both`,
              }}
            />

            {/* ── 소셜 링크 ── */}
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 },
                animation: `${fadeInUp} 0.6s ease 1.3s both`,
              }}
            >
              <Typography sx={{ color: 'rgba(242,237,232,0.3)', fontSize: { xs: '0.6rem', md: '0.65rem' }, letterSpacing: 3, fontWeight: 600 }}>
                FIND ME
              </Typography>
              <Box sx={{ width: 20, height: '1px', bgcolor: 'rgba(242,237,232,0.15)' }} />

              {SOCIAL_LINKS.map(({ icon: Icon, href, label, active }) => (
                <Tooltip key={label} title={label} arrow>
                  {active ? (
                    <IconButton
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      sx={{
                        // 터치 최소 44px 확보
                        width: 44, height: 44,
                        bgcolor: 'rgba(242,237,232,0.07)',
                        border: '1px solid rgba(242,237,232,0.16)',
                        color: 'rgba(242,237,232,0.55)',
                        transition: 'all 0.22s',
                        '&:hover': { bgcolor: 'rgba(242,237,232,0.15)', color: '#F2EDE8', borderColor: 'rgba(242,237,232,0.42)', transform: 'translateY(-3px)', boxShadow: '0 8px 22px rgba(0,0,0,0.3)' },
                        '&:focus-visible': { outline: '2px solid #8B1A2F', outlineOffset: 2 },
                      }}
                    >
                      <Icon size={18} />
                    </IconButton>
                  ) : (
                    <span>
                      <IconButton disabled aria-label={label}
                        sx={{ width: 44, height: 44, '&.Mui-disabled': { border: '1px solid rgba(242,237,232,0.08)', color: 'rgba(242,237,232,0.2)' } }}
                      >
                        <Icon size={18} />
                      </IconButton>
                    </span>
                  )}
                </Tooltip>
              ))}
            </Box>
          </Grid>

          {/* ── 오른쪽: 장식 원 ── */}
          {/* 데스크탑(md+): 340px 원 / 태블릿·모바일: 숨김 */}
          <Grid item md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <DecoCircle size={isDesktop ? 340 : 280} />
          </Grid>

          {/* ── 모바일·태블릿 전용: 스킬 칩 ── */}
          <Grid item xs={12} sx={{ display: { md: 'none' }, mt: { xs: -1, sm: -2 } }}>
            <Box
              sx={{
                display: 'flex', gap: { xs: 1, sm: 1.5 }, flexWrap: 'wrap',
                animation: `${fadeInUp} 0.6s ease 1.5s both`,
              }}
            >
              {SKILLS.map(s => (
                <Box
                  key={s.name}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.8,
                    px: { xs: 1.2, sm: 1.5 }, py: { xs: 0.6, sm: 0.7 },
                    borderRadius: 10,
                    bgcolor: 'rgba(242,237,232,0.07)',
                    border: '1px solid rgba(242,237,232,0.15)',
                    // 터치 영역 최소 높이 확보
                    minHeight: 36,
                  }}
                >
                  <SkillIcon name={s.name} color={s.color} size={13} />
                  <Typography sx={{ color: '#C4B8B0', fontSize: { xs: '0.7rem', sm: '0.72rem' }, fontWeight: 600 }}>
                    {s.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* ── 스크롤 인디케이터 ── */}
      {/* 외부: 수평 중앙 정렬 (transform 충돌 방지) */}
      <Box sx={{ position: 'absolute', bottom: { xs: 16, sm: 20, md: 28 }, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        {/* 내부: 바운스 애니메이션 + 클릭 */}
        <Box
          role="button" tabIndex={0}
          onClick={() => scrollToSection('about')}
          onKeyDown={e => e.key === 'Enter' && scrollToSection('about')}
          aria-label="다음 섹션으로 스크롤"
          sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
            cursor: 'pointer', opacity: 0.42, outline: 'none',
            // 터치 영역 확보
            p: 1, minWidth: 44, minHeight: 44, justifyContent: 'center',
            animation: `${bounce} 2.5s ease-in-out 2.5s infinite`,
            transition: 'opacity 0.2s',
            '&:hover':        { opacity: 0.75 },
            '&:focus-visible':{ opacity: 0.75 },
          }}
        >
          <Typography sx={{ color: '#F2EDE8', fontSize: '0.6rem', letterSpacing: 3, fontWeight: 600 }}>
            SCROLL
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: '#F2EDE8', fontSize: { xs: 20, md: 22 } }} />
        </Box>
      </Box>
    </Box>
  )
}
