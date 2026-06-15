import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// ─── 상수 ──────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home',     path: '/'         },
  { label: 'About Me', path: '/about'    },
  { label: 'Projects', path: '/projects' },
]

const NAVBAR_HEIGHT = 64

// ─── 읽기 진행률 바 ──────────────────────────────────
function ProgressBar({ value }) {
  return (
    <Box
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="페이지 읽기 진행률"
      sx={{
        position: 'absolute', bottom: 0, left: 0,
        height: 2,
        background: 'linear-gradient(90deg, #8B1A2F 0%, #B5253E 60%, #6B1D35 100%)',
        width: `${value}%`,
        transition: 'width 0.1s linear',
        zIndex: 1,
        borderRadius: '0 2px 2px 0',
      }}
    />
  )
}

// ─── 햄버거 아이콘 (3선 ↔ X 애니메이션) ──────────────
function HamburgerIcon({ open }) {
  const base = {
    position: 'absolute', left: 0, right: 0,
    height: '2px', borderRadius: '1px',
    bgcolor: '#F2EDE8',
    transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
  }
  return (
    <Box sx={{ position: 'relative', width: 22, height: 16, flexShrink: 0 }}>
      {/* 상단 선: open 시 중앙으로 내려와 45° 회전 */}
      <Box sx={{ ...base, top: 0, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
      {/* 중간 선: open 시 페이드 아웃 */}
      <Box sx={{ ...base, top: '50%', mt: '-1px', opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
      {/* 하단 선: open 시 중앙으로 올라와 -45° 회전 */}
      <Box sx={{ ...base, bottom: 0, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
    </Box>
  )
}

// ─── 데스크탑 네비게이션 링크 ──────────────────────────
function NavLink({ label, active, onClick }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      sx={{
        position: 'relative',
        px: 2, py: 1,
        bgcolor: 'transparent', border: 'none', cursor: 'pointer',
        color: active ? '#F2EDE8' : 'rgba(242,237,232,0.55)',
        fontWeight: active ? 700 : 400,
        fontSize: '0.9rem',
        fontFamily: 'inherit',
        letterSpacing: 0.3,
        transition: 'color 0.22s',
        '&:hover': { color: '#F2EDE8' },
        '&:focus-visible': { outline: '2px solid #8B1A2F', outlineOffset: 3, borderRadius: 1 },
        // 활성 언더라인
        '&::after': {
          content: '""',
          position: 'absolute', bottom: 2,
          left: '50%', transform: active ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
          width: '55%', height: '2px',
          bgcolor: '#8B1A2F', borderRadius: 1,
          transformOrigin: 'center',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      }}
    >
      {label}
    </Box>
  )
}

// ─── 모바일 드로어 메뉴 아이템 ───────────────────────
function DrawerNavItem({ label, active, index, onClick }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        width: '100%', textAlign: 'left',
        px: 0, py: 2,
        bgcolor: 'transparent', border: 'none', borderBottom: '1px solid rgba(242,237,232,0.07)',
        cursor: 'pointer', fontFamily: 'inherit',
        color: active ? '#F2EDE8' : 'rgba(242,237,232,0.5)',
        transition: 'color 0.2s',
        '&:hover':        { color: '#F2EDE8' },
        '&:focus-visible':{ outline: '2px solid #8B1A2F', outlineOffset: 2 },
        // 순차 슬라이드인 애니메이션용 — 드로어 열릴 때 사용
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* 활성 표시 점 */}
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: active ? '#8B1A2F' : 'rgba(242,237,232,0.2)', flexShrink: 0, transition: 'background-color 0.2s', boxShadow: active ? '0 0 6px #8B1A2F' : 'none' }} />
      <Typography sx={{ fontWeight: active ? 700 : 400, fontSize: '1.05rem', lineHeight: 1.4 }}>
        {label}
      </Typography>
      {active && (
        <Typography sx={{ ml: 'auto', color: '#8B1A2F', fontSize: '0.7rem', fontWeight: 600, letterSpacing: 1 }}>
          NOW
        </Typography>
      )}
    </Box>
  )
}

// ─── 메인 컴포넌트 ──────────────────────────────────
export default function Navbar() {
  const navigate      = useNavigate()
  const { pathname }  = useLocation()
  const theme         = useTheme()
  const isMobile      = useMediaQuery(theme.breakpoints.down('md'))

  // ── 상태 ──
  const [visible,   setVisible]   = useState(true)   // 헤더 표시 여부
  const [scrolled,  setScrolled]  = useState(false)  // 스크롤됨 (glass 효과)
  const [progress,  setProgress]  = useState(0)      // 읽기 진행률 0~100
  const [menuOpen,  setMenuOpen]  = useState(false)  // 모바일 드로어 열림

  const lastScrollY   = useRef(0)
  const ticking       = useRef(false)   // rAF 중복 방지

  // ── 스크롤 감지 (rAF로 성능 최적화) ──────────────
  useEffect(() => {
    function update() {
      const cur    = window.scrollY
      const docH   = document.documentElement.scrollHeight - window.innerHeight
      const diff   = cur - lastScrollY.current

      // 읽기 진행률
      setProgress(docH > 0 ? Math.min((cur / docH) * 100, 100) : 0)

      // 헤더 표시/숨김
      if (cur < 10) {
        setVisible(true)          // 최상단 → 항상 표시
      } else if (diff > 6) {
        setVisible(false)         // 아래 스크롤 → 숨김
        setMenuOpen(false)        // 드로어도 닫기
      } else if (diff < -4) {
        setVisible(true)          // 위 스크롤 → 표시
      }

      // 배경 글래스 효과 (60px 이상 스크롤 시)
      setScrolled(cur > 60)

      lastScrollY.current = cur
      ticking.current     = false
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── 라우트 변경 시 드로어 닫기 ──────────────────
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // ── 드로어 열릴 때 body 스크롤 잠금 ──────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow     = 'hidden'
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    } else {
      document.body.style.overflow     = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow     = ''
      document.body.style.paddingRight = ''
    }
  }, [menuOpen])

  const currentIdx = NAV_ITEMS.findIndex(i => i.path === pathname)

  return (
    <>
      {/* ─── 헤더 ──────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          position: 'sticky', top: 0, zIndex: 1200,
          height: NAVBAR_HEIGHT,

          // hide/show — CSS transform (GPU 가속)
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: [
            'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
            'background-color 0.3s ease',
            'backdrop-filter 0.3s ease',
            'box-shadow 0.3s ease',
          ].join(', '),

          // 글래스 모피즘 (스크롤 시)
          bgcolor:       scrolled ? 'rgba(28,10,20,0.88)' : '#1C0A14',
          backdropFilter:scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          boxShadow:     scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', px: { xs: 2.5, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>

            {/* 로고 */}
            <Typography
              component="button"
              onClick={() => navigate('/')}
              aria-label="홈으로 이동"
              sx={{
                flexGrow: 1, fontWeight: 700, letterSpacing: 2.5,
                color: '#F2EDE8', cursor: 'pointer',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                bgcolor: 'transparent', border: 'none', fontFamily: 'inherit',
                textAlign: 'left', p: 0,
                transition: 'opacity 0.2s',
                '&:hover':        { opacity: 0.75 },
                '&:focus-visible':{ outline: '2px solid #8B1A2F', outlineOffset: 3, borderRadius: 1 },
              }}
            >
              PORTFOLIO
            </Typography>

            {/* 데스크탑 메뉴 */}
            {!isMobile && (
              <Box component="nav" aria-label="메인 네비게이션" sx={{ display: 'flex', gap: 0.5 }}>
                {NAV_ITEMS.map((item, idx) => (
                  <NavLink
                    key={item.path}
                    label={item.label}
                    active={currentIdx === idx}
                    onClick={() => navigate(item.path)}
                  />
                ))}
              </Box>
            )}

            {/* 모바일 햄버거 버튼 */}
            {isMobile && (
              <Box
                component="button"
                onClick={() => setMenuOpen(p => !p)}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer"
                aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  // 터치 44px 확보
                  width: 44, height: 44,
                  bgcolor: 'transparent', border: 'none', cursor: 'pointer',
                  ml: 1, borderRadius: 1,
                  '&:focus-visible':{ outline: '2px solid #8B1A2F', outlineOffset: 2 },
                }}
              >
                <HamburgerIcon open={menuOpen} />
              </Box>
            )}
          </Box>
        </Container>

        {/* 읽기 진행률 바 */}
        <ProgressBar value={progress} />
      </Box>

      {/* ─── 모바일 드로어 ────────────────────────────── */}

      {/* 백드롭 오버레이 */}
      <Box
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        sx={{
          position: 'fixed', inset: 0,
          bgcolor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
          zIndex: 1250,
        }}
      />

      {/* 슬라이드 드로어 */}
      <Box
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="네비게이션 메뉴"
        sx={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: { xs: '72%', sm: 300 },

          // 슬라이드 인/아웃
          transform:  menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',

          bgcolor:    '#1C0A14',
          borderLeft: '1px solid rgba(242,237,232,0.1)',
          boxShadow:  menuOpen ? '-8px 0 32px rgba(0,0,0,0.5)' : 'none',
          zIndex: 1300,
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* 드로어 헤더 */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 3, height: NAVBAR_HEIGHT,
            borderBottom: '1px solid rgba(242,237,232,0.08)',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ color: 'rgba(242,237,232,0.4)', fontSize: '0.7rem', letterSpacing: 3, fontWeight: 600 }}>
            NAVIGATION
          </Typography>
          <Box
            component="button"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40,
              bgcolor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 1,
              '&:focus-visible':{ outline: '2px solid #8B1A2F', outlineOffset: 2 },
            }}
          >
            <HamburgerIcon open={true} />
          </Box>
        </Box>

        {/* 메뉴 아이템 */}
        <Box component="nav" aria-label="모바일 네비게이션" sx={{ flex: 1, px: 3, pt: 1 }}>
          {NAV_ITEMS.map((item, idx) => (
            <DrawerNavItem
              key={item.path}
              label={item.label}
              active={currentIdx === idx}
              index={idx}
              onClick={() => navigate(item.path)}
            />
          ))}
        </Box>

        {/* 드로어 푸터 */}
        <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid rgba(242,237,232,0.07)', flexShrink: 0 }}>
          <Typography sx={{ color: 'rgba(242,237,232,0.25)', fontSize: '0.7rem', lineHeight: 1.6 }}>
            YuJin · 웹디자이너 포트폴리오
            <br />
            © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
