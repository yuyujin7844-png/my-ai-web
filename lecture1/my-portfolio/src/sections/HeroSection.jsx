import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { SiGithub } from 'react-icons/si'
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

// ─── 도형 패턴 SVG (원·사각형·삼각형, 크기 제각각) ──
const _geo = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
  <circle cx='22'  cy='22'  r='4'   fill='rgba(242,237,232,0.08)'/>
  <circle cx='120' cy='72'  r='15'  fill='none' stroke='rgba(242,237,232,0.055)' stroke-width='1.2'/>
  <circle cx='192' cy='158' r='6'   fill='rgba(242,237,232,0.065)'/>
  <circle cx='54'  cy='182' r='10'  fill='none' stroke='rgba(242,237,232,0.06)'  stroke-width='1'/>
  <circle cx='208' cy='38'  r='2.5' fill='rgba(242,237,232,0.1)'/>
  <circle cx='165' cy='225' r='7'   fill='none' stroke='rgba(242,237,232,0.05)'  stroke-width='1'/>
  <rect x='84'  y='6'   width='18' height='18' fill='none'                     stroke='rgba(242,237,232,0.06)'  stroke-width='1.2' transform='rotate(45,93,15)'/>
  <rect x='168' y='56'  width='9'  height='9'  fill='rgba(242,237,232,0.07)'                                                      transform='rotate(20,172,61)'/>
  <rect x='26'  y='106' width='22' height='22' fill='none'                     stroke='rgba(242,237,232,0.05)'  stroke-width='1'   transform='rotate(12,37,117)'/>
  <rect x='146' y='196' width='11' height='11' fill='none'                     stroke='rgba(242,237,232,0.07)'  stroke-width='1'   transform='rotate(33,151,202)'/>
  <rect x='70'  y='136' width='7'  height='7'  fill='rgba(242,237,232,0.065)'                                                     transform='rotate(45,73,140)'/>
  <rect x='218' y='120' width='13' height='13' fill='none'                     stroke='rgba(242,237,232,0.05)'  stroke-width='1'   transform='rotate(25,224,126)'/>
  <polygon points='144,36  162,66  126,66'  fill='none'                   stroke='rgba(242,237,232,0.06)'  stroke-width='1.2'/>
  <polygon points='224,96  234,114 214,114' fill='rgba(242,237,232,0.055)'/>
  <polygon points='38,46   58,78   18,78'   fill='none'                   stroke='rgba(242,237,232,0.05)'  stroke-width='1'/>
  <polygon points='178,150 194,176 162,176' fill='none'                   stroke='rgba(242,237,232,0.07)'  stroke-width='1'/>
  <polygon points='82,216  91,234  73,234'  fill='rgba(242,237,232,0.065)'/>
  <polygon points='232,200 224,218 240,218' fill='none'                   stroke='rgba(242,237,232,0.05)'  stroke-width='1'/>
</svg>`
const GEO_BG = `url("data:image/svg+xml,${encodeURIComponent(_geo)}")`

// ─── 서브 컴포넌트 ────────────────────────────────────

// 스킬 뱃지 (장식 원 주변)
function SkillBadge({ name, color }) {
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.8,
        px: 1.5, py: 0.7, borderRadius: 10,
        bgcolor: 'rgba(20,6,14,0.88)',
        border: `1px solid ${color}45`,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 4px 14px rgba(0,0,0,0.35), 0 0 0 1px ${color}20`,
        whiteSpace: 'nowrap',
      }}
    >
      <SkillIcon name={name} color={color} size={13} />
      <Typography sx={{ color: '#F2EDE8', fontWeight: 700, fontSize: '0.68rem', letterSpacing: 0.3 }}>
        {name}
      </Typography>
    </Box>
  )
}

// 우측 장식 원형 패널
function DecoCircle() {
  return (
    <Box
      sx={{
        position: 'relative', width: 340, height: 340, mx: 'auto',
        animation: `${fadeInRight} 0.9s ease 0.7s both`,
      }}
    >
      {/* 바깥 링: 느리게 회전 + 점 4개 */}
      <Box
        sx={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px dashed rgba(242,237,232,0.18)',
          animation: `${spin} 40s linear infinite`,
        }}
      >
        {[0, 90, 180, 270].map(angle => (
          <Box
            key={angle}
            sx={{
              position: 'absolute', top: '50%', left: '50%',
              width: 7, height: 7, mt: '-3.5px', ml: '-3.5px',
              borderRadius: '50%',
              bgcolor: angle === 0 ? '#8B1A2F' : 'rgba(242,237,232,0.22)',
              boxShadow: angle === 0 ? '0 0 8px #8B1A2F' : 'none',
              transform: `rotate(${angle}deg) translateY(-170px)`,
            }}
          />
        ))}
      </Box>

      {/* 중간 링 */}
      <Box
        sx={{
          position: 'absolute', inset: 44, borderRadius: '50%',
          border: '1px solid rgba(242,237,232,0.09)',
        }}
      />

      {/* 안쪽 메인 원 (YJ 모노그램) */}
      <Box
        sx={{
          position: 'absolute', inset: 86, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #3D1526 0%, #1C0A14 100%)',
          border: '1.5px solid rgba(242,237,232,0.22)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 50px rgba(139,26,47,0.35), inset 0 0 30px rgba(107,29,53,0.2)',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '3rem', fontWeight: 800,
            color: '#F2EDE8', lineHeight: 1,
            letterSpacing: '-2px',
          }}
        >
          YJ
        </Typography>
        <Typography
          sx={{
            color: 'rgba(242,237,232,0.35)',
            fontSize: '0.58rem', letterSpacing: 4,
            fontWeight: 600, mt: 0.8,
          }}
        >
          DESIGNER
        </Typography>
      </Box>

      {/* 스킬 뱃지: 3개 위치 */}
      <Box sx={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
        <SkillBadge name="Figma" color="#F24E1E" />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 28, right: -8 }}>
        <SkillBadge name="Photoshop" color="#31A8FF" />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 28, left: -8 }}>
        <SkillBadge name="Illustrator" color="#FF9A00" />
      </Box>
    </Box>
  )
}

// ─── 메인 컴포넌트 ────────────────────────────────────
export default function HeroSection() {
  const navigate = useNavigate()

  // 타이핑 효과 상태
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase,     setPhase]     = useState('typing') // 'typing' | 'deleting'

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timer

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 110)
      } else {
        timer = setTimeout(() => setPhase('deleting'), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 65)
      } else {
        setRoleIdx(prev => (prev + 1) % ROLES.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timer)
  }, [displayed, phase, roleIdx])

  return (
    <Box
      component="section"
      aria-label="포트폴리오 메인 소개"
      sx={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        // 3중 배경: 방사형 하이라이트 + 기본 그라데이션 + 꽃 패턴
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
      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">

          {/* ── 왼쪽: 텍스트 콘텐츠 ── */}
          <Grid item xs={12} md={7}>

            {/* Open to Work 배지 */}
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: 2, py: 0.9, mb: 3, borderRadius: 10,
                bgcolor: 'rgba(242,237,232,0.07)',
                border: '1px solid rgba(242,237,232,0.18)',
                backdropFilter: 'blur(8px)',
                animation: `${fadeInDown} 0.6s ease 0.1s both`,
              }}
            >
              <Box
                sx={{
                  width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50',
                  animation: `${pulse} 2s ease-in-out infinite`,
                }}
              />
              <Typography sx={{ color: '#F2EDE8', fontSize: '0.78rem', fontWeight: 600, letterSpacing: 1 }}>
                Open to Work
              </Typography>
            </Box>

            {/* OVERLINE */}
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: '#B5253E', letterSpacing: 4, fontSize: '0.78rem', mb: 1.5,
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
                fontSize: { xs: '3.2rem', sm: '4.2rem', md: '5.2rem' },
                fontWeight: 800,
                color: '#F2EDE8',
                lineHeight: 1.05,
                mb: 2,
                letterSpacing: '-1.5px',
                animation: `${fadeInUp} 0.6s ease 0.5s both`,
              }}
            >
              YuJin
            </Typography>

            {/* 타이핑 직함 */}
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 2, mb: 3.5,
                animation: `${fadeInUp} 0.6s ease 0.7s both`,
              }}
            >
              <Box
                sx={{
                  width: 28, height: 2.5, borderRadius: 2,
                  bgcolor: '#8B1A2F', flexShrink: 0,
                }}
              />
              <Typography
                component="p"
                sx={{
                  color: '#C4B8B0', fontWeight: 400,
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  minHeight: '1.6em',
                  letterSpacing: 0.3,
                }}
              >
                {displayed}
                {/* 깜빡이는 커서 */}
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{
                    display: 'inline-block',
                    width: '2px', height: '1em',
                    bgcolor: '#8B1A2F', ml: 0.3,
                    verticalAlign: 'middle',
                    animation: `${blink} 0.85s step-end infinite`,
                  }}
                />
              </Typography>
            </Box>

            {/* 소개 문구 */}
            <Typography
              variant="body1"
              sx={{
                color: '#9A8E88', lineHeight: 2,
                fontSize: { xs: '0.92rem', md: '0.98rem' },
                maxWidth: 460, mb: 4.5,
                animation: `${fadeInUp} 0.6s ease 0.9s both`,
              }}
            >
              사용자의 시선이 머무는 순간을 디자인합니다.
              <br />
              작은 디테일 하나 놓치지 않는 섬세함으로,
              <br />
              브랜드의 매력을 웹 공간에 온전히 담아내겠습니다.
            </Typography>

            {/* CTA 버튼 */}
            <Box
              sx={{
                display: 'flex', gap: 2, flexWrap: 'wrap',
                animation: `${fadeInUp} 0.6s ease 1.1s both`,
              }}
            >
              {/* 이력서 (비활성화 + Tooltip) */}
              <Tooltip title="이력서를 준비 중입니다 🙏" arrow placement="top">
                <span>
                  <Button
                    variant="outlined"
                    size="large"
                    disabled
                    startIcon={<FileDownloadOutlinedIcon />}
                    sx={{
                      px: 3.5, py: 1.5, fontWeight: 600, borderRadius: 2,
                      '&.Mui-disabled': {
                        borderColor: 'rgba(242,237,232,0.15)',
                        color: 'rgba(242,237,232,0.22)',
                      },
                    }}
                  >
                    이력서 다운로드
                  </Button>
                </span>
              </Tooltip>

              {/* 작업물 보기 */}
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/projects')}
                aria-label="프로젝트 목록으로 이동"
                sx={{
                  bgcolor: '#8B1A2F', color: '#F7F3EF',
                  px: 3.5, py: 1.5, fontWeight: 600, borderRadius: 2,
                  transition: 'all 0.25s',
                  '&:hover': {
                    bgcolor: '#B5253E',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(139,26,47,0.55)',
                  },
                }}
              >
                작업물 보기
              </Button>
            </Box>

            {/* 소셜 링크 */}
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 2, mt: 3.5,
                animation: `${fadeInUp} 0.6s ease 1.3s both`,
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(242,237,232,0.28)',
                  fontSize: '0.65rem', letterSpacing: 3, fontWeight: 600,
                }}
              >
                FIND ME
              </Typography>
              <Box sx={{ width: 24, height: 1, bgcolor: 'rgba(242,237,232,0.18)' }} />
              <IconButton
                component="a"
                href="https://github.com/yuyujin7844-png"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub 프로필 열기"
                sx={{
                  color: 'rgba(242,237,232,0.45)', p: 1,
                  transition: 'all 0.22s',
                  '&:hover': { color: '#F2EDE8', transform: 'translateY(-2px)' },
                  '&:focus-visible': { outline: '2px solid #8B1A2F', outlineOffset: 2 },
                }}
              >
                <SiGithub size={19} />
              </IconButton>
            </Box>
          </Grid>

          {/* ── 오른쪽: 장식 패널 (데스크탑만) ── */}
          <Grid
            item md={5}
            sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}
          >
            <DecoCircle />
          </Grid>

          {/* ── 모바일 전용: 스킬 칩 ── */}
          <Grid item xs={12} sx={{ display: { md: 'none' }, mt: -2 }}>
            <Box
              sx={{
                display: 'flex', gap: 1.5, flexWrap: 'wrap',
                animation: `${fadeInUp} 0.6s ease 1.5s both`,
              }}
            >
              {SKILLS.map(s => (
                <Box
                  key={s.name}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.8,
                    px: 1.5, py: 0.7, borderRadius: 10,
                    bgcolor: 'rgba(242,237,232,0.07)',
                    border: '1px solid rgba(242,237,232,0.15)',
                  }}
                >
                  <SkillIcon name={s.name} color={s.color} size={13} />
                  <Typography sx={{ color: '#C4B8B0', fontSize: '0.72rem', fontWeight: 600 }}>
                    {s.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* ── 스크롤 유도 인디케이터 ── */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
          animation: `${bounce} 2.5s ease-in-out 2.5s infinite`,
          opacity: 0.45,
        }}
      >
        <Typography sx={{ color: '#F2EDE8', fontSize: '0.6rem', letterSpacing: 3, fontWeight: 600 }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: '#F2EDE8', fontSize: 20 }} />
      </Box>
    </Box>
  )
}
