import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import LinearProgress from '@mui/material/LinearProgress'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import { SiFigma } from 'react-icons/si'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'

// ─── 컬러 팔레트 ─────────────────────────────────────
const C = {
  bg:          '#F2EDE8',
  card:        '#F7F3EF',
  accent:      '#8B1A2F',
  accentDark:  '#6B1D35',
  accentLight: '#B5253E',
  dark:        '#1A1A1A',
  mid:         '#555555',
  light:       '#888888',
  border:      '#D9D0C8',
}

// ─── Adobe 스타일 아이콘 (react-icons에 없는 PS/AI 대체) ─
function AdobeIcon({ abbr, bg }) {
  return (
    <Box
      sx={{
        width: 20, height: 20,
        bgcolor: bg,
        borderRadius: '4px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ color: '#fff', fontSize: '0.58rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px' }}>
        {abbr}
      </Typography>
    </Box>
  )
}

// ─── 데이터 (showInHome: 홈 About 섹션 노출 여부) ────
const PROFILE_DATA = {
  showInHome: true,
  name:      'YuJin',
  career:    '신입',
  birthDate: '1994.7.11',
  role:      '웹디자이너',
  intro:     '사용자의 시선이 머무는 순간을 디자인합니다. 작은 디테일 하나 놓치지 않는 섬세함으로, 브랜드의 매력을 웹 공간에 온전히 담아내겠습니다.',
}

const SKILLS_DATA = {
  showInHome: true,
  label: '보유 스킬',
  items: [
    {
      name:        'Figma',
      level:       80,
      renderIcon:  () => <SiFigma size={20} color="#F24E1E" />,
      color:       '#F24E1E',
      desc:        '와이어프레임 · 프로토타입 · UI 디자인',
    },
    {
      name:        'Photoshop',
      level:       60,
      renderIcon:  () => <AdobeIcon abbr="Ps" bg="#31A8FF" />,
      color:       '#31A8FF',
      desc:        '이미지 보정 · 합성 · 배너 제작',
    },
    {
      name:        'Illustrator',
      level:       70,
      renderIcon:  () => <AdobeIcon abbr="Ai" bg="#FF9A00" />,
      color:       '#FF9A00',
      desc:        '벡터 그래픽 · 로고 · 아이콘 제작',
    },
  ],
}

const CERTS_DATA = {
  showInHome: false,
  label: '자격증',
  items: [
    { name: 'GTQ',             fullName: '그래픽 기술자격',          date: '2026.05', color: '#8B1A2F' },
    { name: 'GTQi',            fullName: '그래픽 기술자격 일러스트', date: '2026.04', color: '#6B1D35' },
    { name: 'ACP-Photoshop',   fullName: 'ACP 어도비 포토샵',        date: '2026.05', color: '#31A8FF' },
    { name: 'ACP-Illustrator', fullName: 'ACP 어도비 일러스트',      date: '2026.05', color: '#FF9A00' },
  ],
}

const SKILL_LEVELS = [
  { label: '상급 (85%+)',     desc: '실무 단독 수행',   color: '#8B1A2F' },
  { label: '중급 (70~84%)',   desc: '대부분 단독 수행', color: '#B5253E' },
  { label: '초중급 (50~69%)', desc: '기본 기능 숙지',   color: '#888888' },
]

const INFO_ITEMS = [
  { Icon: PersonOutlinedIcon, label: '이름',    value: PROFILE_DATA.name },
  { Icon: WorkOutlineIcon,    label: '경력',    value: PROFILE_DATA.career },
  { Icon: CakeOutlinedIcon,   label: '생년월일', value: PROFILE_DATA.birthDate },
  { Icon: BrushOutlinedIcon,  label: '직무',    value: PROFILE_DATA.role },
]

// ─── 숙련도 레벨 반환 ─────────────────────────────────
function getLevel(pct) {
  if (pct >= 85) return { label: '상급',   color: '#8B1A2F' }
  if (pct >= 70) return { label: '중급',   color: '#B5253E' }
  if (pct >= 50) return { label: '초중급', color: '#888888' }
  return               { label: '학습 중', color: '#AAAAAA' }
}

// ─── 인적사항 행 ─────────────────────────────────────
function InfoRow({ Icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.8 }}>
      <Box
        sx={{
          width: 30, height: 30, borderRadius: '8px',
          bgcolor: `${C.accent}12`, border: `1px solid ${C.accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color: C.accent, fontSize: 15 }} />
      </Box>
      <Typography variant="caption" sx={{ color: C.light, width: 56, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600} color={C.dark}>
        {value}
      </Typography>
    </Box>
  )
}

// ─── 스킬 프로그레스 바 ───────────────────────────────
function SkillBar({ skill, animate }) {
  const lv = getLevel(skill.level)
  return (
    <Box
      sx={{
        bgcolor: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 2,
        p: 2.5,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: `0 4px 16px ${skill.color}25` },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38, height: 38, borderRadius: '10px',
              bgcolor: C.card, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px ${skill.color}33`,
              flexShrink: 0,
            }}
          >
            {skill.renderIcon()}
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700} color={C.dark}>
              {skill.name}
            </Typography>
            <Typography variant="caption" color={C.light}>
              {skill.desc}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0, ml: 1 }}>
          <Typography variant="body2" fontWeight={700} color={C.accent}>
            {skill.level}%
          </Typography>
          <Typography variant="caption" sx={{ color: lv.color, fontWeight: 700 }}>
            {lv.label}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={animate ? skill.level : 0}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: C.border,
          '& .MuiLinearProgress-bar': {
            bgcolor: C.accent,
            borderRadius: 4,
            transition: 'transform 1.3s cubic-bezier(0.25, 1, 0.5, 1) !important',
          },
        }}
      />
    </Box>
  )
}

// ─── 자격증 카드 ─────────────────────────────────────
function CertCard({ cert }) {
  return (
    <Box
      sx={{
        bgcolor: C.bg,
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${cert.color}`,
        borderRadius: 2,
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateX(4px)', boxShadow: `0 4px 16px ${cert.color}20` },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40, height: 40, borderRadius: '50%',
            bgcolor: `${cert.color}15`,
            border: `1.5px solid ${cert.color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <EmojiEventsOutlinedIcon sx={{ color: cert.color, fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} color={C.dark}>
            {cert.name}
          </Typography>
          <Typography variant="caption" color={C.mid}>
            {cert.fullName}
          </Typography>
        </Box>
      </Box>
      <Chip
        label={cert.date}
        size="small"
        sx={{
          bgcolor: `${cert.color}15`,
          color: cert.color,
          border: `1px solid ${cert.color}40`,
          fontWeight: 700,
          fontSize: '0.72rem',
          flexShrink: 0,
        }}
      />
    </Box>
  )
}

// ─── 탭 패널 ─────────────────────────────────────────
function TabPanel({ children, value, index }) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
      {value === index && children}
    </Box>
  )
}

// ─── 메인 컴포넌트 ───────────────────────────────────
export default function AboutMe() {
  const [profileImg, setProfileImg]     = useState(null)
  const [tab, setTab]                   = useState(0)
  const [skillAnimate, setSkillAnimate] = useState(false)
  const fileInputRef                    = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setSkillAnimate(true), 400)
    return () => clearTimeout(t)
  }, [])

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (file) setProfileImg(URL.createObjectURL(file))
  }

  return (
    <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: C.bg, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">

        {/* ── 섹션 헤더 ────────────────────────────── */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: C.accentLight, letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}
          >
            ABOUT ME
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: C.dark }}
          >
            안녕하세요,{' '}
            <Box component="span" sx={{ color: C.accent }}>YuJin</Box>
            입니다
          </Typography>
          <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', mt: 3, border: 'none' }} />
        </Box>

        {/* ── 프로필 카드 ──────────────────────────── */}
        <Card
          elevation={0}
          sx={{ bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 3, mb: 3 }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">

              {/* 프로필 이미지 */}
              <Grid item xs={12} sm="auto" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Tooltip title="클릭하여 사진 변경" placement="bottom" arrow>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                          width: 34, height: 34, borderRadius: '50%',
                          bgcolor: C.accent, border: `2px solid ${C.card}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: C.accentDark },
                        }}
                      >
                        <CameraAltOutlinedIcon sx={{ color: '#fff', fontSize: 16 }} />
                      </Box>
                    }
                  >
                    <Avatar
                      src={profileImg}
                      onClick={() => fileInputRef.current?.click()}
                      sx={{
                        width: 140, height: 140,
                        bgcolor: '#1C0A14',
                        border: `3px solid ${C.accent}`,
                        fontSize: '3.5rem',
                        fontWeight: 700,
                        color: '#F2EDE8',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s, transform 0.2s',
                        '&:hover': { opacity: 0.85, transform: 'scale(1.03)' },
                      }}
                    >
                      Y
                    </Avatar>
                  </Badge>
                </Tooltip>
                <Typography variant="caption" sx={{ color: C.light, mt: 1.5 }}>
                  클릭하여 사진 업로드
                </Typography>
              </Grid>

              {/* 인적사항 */}
              <Grid item xs={12} sm>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip
                    label="웹디자이너"
                    size="small"
                    sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, px: 0.5 }}
                  />
                  <Chip
                    label="신입"
                    size="small"
                    sx={{
                      bgcolor: `${C.accent}12`,
                      color: C.accent,
                      border: `1px solid ${C.accent}40`,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Divider sx={{ borderColor: C.border, mb: 1.5 }} />

                {INFO_ITEMS.map(({ Icon, label, value }) => (
                  <InfoRow key={label} Icon={Icon} label={label} value={value} />
                ))}

                <Divider sx={{ borderColor: C.border, my: 2 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: C.mid,
                    lineHeight: 2,
                    fontStyle: 'italic',
                    borderLeft: `3px solid ${C.accent}`,
                    pl: 2,
                    py: 0.5,
                  }}
                >
                  {PROFILE_DATA.intro}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ── 탭 섹션 (스킬 / 자격증) ─────────────── */}
        <Card
          elevation={0}
          sx={{ bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 3 }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{
                borderBottom: `1px solid ${C.border}`,
                '& .MuiTab-root': {
                  fontWeight: 600, color: C.light,
                  textTransform: 'none', fontSize: '0.95rem', minHeight: 48,
                },
                '& .Mui-selected': { color: C.accent },
                '& .MuiTabs-indicator': {
                  bgcolor: C.accent, height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <SiFigma size={14} />
                    {SKILLS_DATA.label}
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <EmojiEventsOutlinedIcon sx={{ fontSize: 16 }} />
                    {CERTS_DATA.label}
                  </Box>
                }
              />
            </Tabs>

            {/* 스킬 탭 */}
            <TabPanel value={tab} index={0}>
              <Box
                sx={{
                  bgcolor: `${C.accent}07`, border: `1px solid ${C.accent}20`,
                  borderRadius: 2, p: { xs: 1.5, sm: 2 }, mb: 3,
                  display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 2 },
                }}
              >
                <Typography variant="caption" sx={{ color: C.light, width: '100%', fontWeight: 600 }}>
                  숙련도 기준
                </Typography>
                {SKILL_LEVELS.map(lv => (
                  <Box key={lv.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: lv.color, flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ color: lv.color, fontWeight: 700 }}>
                      {lv.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: C.light }}>
                      — {lv.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {SKILLS_DATA.items.map(skill => (
                  <SkillBar key={skill.name} skill={skill} animate={skillAnimate} />
                ))}
              </Box>
            </TabPanel>

            {/* 자격증 탭 */}
            <TabPanel value={tab} index={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {CERTS_DATA.items.map(cert => (
                  <CertCard key={cert.name} cert={cert} />
                ))}
              </Box>
              <Box
                sx={{
                  mt: 3, p: 2,
                  bgcolor: `${C.accent}07`, border: `1px solid ${C.accent}20`,
                  borderRadius: 2, textAlign: 'center',
                }}
              >
                <Typography variant="caption" sx={{ color: C.light }}>
                  모든 자격증은 공식 기관을 통해 취득하였습니다
                </Typography>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>

      </Container>
    </Box>
  )
}
