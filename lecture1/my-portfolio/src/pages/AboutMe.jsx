import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import LinearProgress from '@mui/material/LinearProgress'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SkillIcon from '../components/SkillIcon'
import { usePortfolio } from '../context/PortfolioContext'

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

const CERTS = [
  { name: 'GTQ',             fullName: '그래픽 기술자격',          date: '2026.05', color: '#8B1A2F' },
  { name: 'GTQi',            fullName: '그래픽 기술자격 일러스트', date: '2026.04', color: '#6B1D35' },
  { name: 'ACP-Photoshop',   fullName: 'ACP 어도비 포토샵',        date: '2026.05', color: '#31A8FF' },
  { name: 'ACP-Illustrator', fullName: 'ACP 어도비 일러스트',      date: '2026.05', color: '#FF9A00' },
]

// 숙련도 기준 데이터
const SKILL_LEVELS = [
  { label: '상급',   fullLabel: '상급 (85%+)',     desc: '실무 단독 수행',   color: '#8B1A2F' },
  { label: '중급',   fullLabel: '중급 (70~84%)',   desc: '대부분 단독 수행', color: '#B5253E' },
  { label: '초중급', fullLabel: '초중급 (50~69%)', desc: '기본 기능 숙지',   color: '#888888' },
]

function getLevel(pct) {
  if (pct >= 85) return { label: '상급',   color: '#8B1A2F' }
  if (pct >= 70) return { label: '중급',   color: '#B5253E' }
  if (pct >= 50) return { label: '초중급', color: '#888888' }
  return               { label: '학습 중', color: '#AAAAAA' }
}

// ─── 인적사항 행 ─────────────────────────────────────
// minHeight 44px → 터치 최소 기준 충족
const InfoRow = memo(function InfoRow({ Icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 44, py: 0.3 }}>
      <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: `${C.accent}12`, border: `1px solid ${C.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon sx={{ color: C.accent, fontSize: 15 }} />
      </Box>
      <Typography variant="caption" sx={{ color: C.light, width: { xs: 52, md: 56 }, flexShrink: 0 }}>{label}</Typography>
      <Typography variant="body2" fontWeight={600} color={C.dark}>{value}</Typography>
    </Box>
  )
})

// ─── 스킬 카드 ───────────────────────────────────────
const SkillCard = memo(function SkillCard({ skill, animate, onLevelChange }) {
  const lv = getLevel(skill.level)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (animate && !initialized) {
      const t = setTimeout(() => setInitialized(true), 1500)
      return () => clearTimeout(t)
    }
  }, [animate, initialized])

  return (
    <Box
      sx={{
        bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: 2,
        p: { xs: 2, md: 2.5 },
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: `0 4px 16px ${skill.color}25` },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: { xs: 34, md: 38 }, height: { xs: 34, md: 38 }, borderRadius: '10px', bgcolor: C.card, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${skill.color}33`, flexShrink: 0 }}>
            <SkillIcon name={skill.name} color={skill.color} size={18} />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700} color={C.dark} sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
              {skill.name}
            </Typography>
            <Typography variant="caption" sx={{ color: lv.color, fontWeight: 700 }}>{lv.label}</Typography>
          </Box>
        </Box>
        <Typography fontWeight={700} color={C.accent} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
          {skill.level}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={animate ? skill.level : 0}
        aria-label={`${skill.name} 숙련도 ${skill.level}%`}
        sx={{
          height: { xs: 7, md: 8 }, borderRadius: 4, bgcolor: C.border, mb: 2,
          '& .MuiLinearProgress-bar': {
            bgcolor: C.accent, borderRadius: 4,
            transition: initialized
              ? 'transform 0.25s ease !important'
              : 'transform 1.3s cubic-bezier(0.25, 1, 0.5, 1) !important',
          },
        }}
      />

      <Box sx={{ px: 0.5 }}>
        <Typography variant="caption" sx={{ color: C.light, display: 'block', mb: 0.5 }}>레벨 조정</Typography>
        <Slider
          value={skill.level}
          onChange={(_, val) => onLevelChange(skill.id, val)}
          min={10} max={100} step={5} size="small"
          aria-label={`${skill.name} 숙련도 조정`}
          aria-valuetext={`${skill.level}%`}
          sx={{
            color: C.accent,
            '& .MuiSlider-thumb': {
              // 모바일: 슬라이더 thumb 크게 (터치 조작성)
              width: { xs: 18, md: 14 },
              height: { xs: 18, md: 14 },
              '&:hover': { boxShadow: `0 0 0 8px ${C.accent}20` },
            },
            '& .MuiSlider-rail': { bgcolor: C.border },
          }}
        />
      </Box>
    </Box>
  )
})

// ─── 자격증 카드 ─────────────────────────────────────
const CertCard = memo(function CertCard({ cert }) {
  return (
    <Box
      sx={{
        bgcolor: C.bg, border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${cert.color}`, borderRadius: 2,
        p: { xs: 2, md: 2.5 },
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateX(4px)', boxShadow: `0 4px 16px ${cert.color}20` },
        // 모바일: 터치 최소 높이
        minHeight: 64,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 } }}>
        <Box sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 }, borderRadius: '50%', bgcolor: `${cert.color}15`, border: `1.5px solid ${cert.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <EmojiEventsOutlinedIcon sx={{ color: cert.color, fontSize: { xs: 18, md: 20 } }} />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} color={C.dark} sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
            {cert.name}
          </Typography>
          <Typography variant="caption" color={C.mid} sx={{ fontSize: { xs: '0.72rem', md: '0.75rem' } }}>
            {cert.fullName}
          </Typography>
        </Box>
      </Box>
      <Chip
        label={cert.date} size="small"
        sx={{ bgcolor: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}40`, fontWeight: 700, fontSize: '0.72rem', flexShrink: 0 }}
      />
    </Box>
  )
})

// ─── 섹션 편집 카드 ──────────────────────────────────
const SectionEditor = memo(function SectionEditor({ section, onChange }) {
  const [localContent, setLocalContent] = useState(section.content)
  const timerRef = useRef(null)

  useEffect(() => {
    setLocalContent(section.content)
  }, [section.id])

  function handleChange(e) {
    const val = e.target.value
    setLocalContent(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onChange(section.id, val), 300)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const previewText = localContent
    ? (localContent.length > 60 ? localContent.substring(0, 60) + '...' : localContent)
    : null

  return (
    <Box
      sx={{
        bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: 2,
        p: { xs: 2, md: 2.5 },
        borderLeft: section.showInHome ? `4px solid ${C.accent}` : `4px solid ${C.border}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5, gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EditOutlinedIcon sx={{ color: C.accent, fontSize: 16 }} />
          <Typography variant="body2" fontWeight={700} color={C.dark} sx={{ fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
            {section.title}
          </Typography>
        </Box>
        <Tooltip title={section.showInHome ? '홈 탭 About 섹션에 표시됩니다' : '홈 탭에 표시되지 않습니다'} arrow>
          <Chip
            icon={<HomeOutlinedIcon sx={{ fontSize: '14px !important' }} />}
            label={section.showInHome ? '홈 노출' : '홈 미노출'}
            size="small"
            sx={{ bgcolor: section.showInHome ? `${C.accent}15` : C.border, color: section.showInHome ? C.accent : C.light, border: `1px solid ${section.showInHome ? C.accent + '40' : C.border}`, fontWeight: 600, fontSize: '0.72rem', cursor: 'default', flexShrink: 0 }}
          />
        </Tooltip>
      </Box>

      <TextField
        fullWidth multiline rows={4}
        placeholder={`${section.title}에 대해 자유롭게 작성해주세요...`}
        value={localContent}
        onChange={handleChange}
        inputProps={{ 'aria-label': section.title }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: C.card, '& fieldset': { borderColor: C.border }, '&:hover fieldset': { borderColor: '#C4B8B0' }, '&.Mui-focused fieldset': { borderColor: C.accent } },
          '& .MuiInputBase-input': { color: C.dark, fontSize: { xs: '0.85rem', md: '0.9rem' }, lineHeight: 1.8 },
        }}
      />

      {section.showInHome && previewText && (
        <Box sx={{ mt: 1, p: 1.2, bgcolor: `${C.accent}07`, border: `1px solid ${C.accent}20`, borderRadius: 1.5 }}>
          <Typography variant="caption" sx={{ color: C.light, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
            홈 탭 미리보기:{' '}
            <Box component="span" sx={{ color: C.mid, fontStyle: 'italic' }}>"{previewText}"</Box>
          </Typography>
        </Box>
      )}
    </Box>
  )
})

// ─── 탭 패널 ─────────────────────────────────────────
function TabPanel({ children, value, index, id, labelledBy }) {
  return (
    <Box role="tabpanel" hidden={value !== index} id={id} aria-labelledby={labelledBy} sx={{ pt: { xs: 2.5, md: 3 } }}>
      {value === index && children}
    </Box>
  )
}

// ─── 메인 컴포넌트 ───────────────────────────────────
export default function AboutMe() {
  const theme    = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))   // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600~899px

  const { aboutMeData, updateSection, updateSkillLevel, updateBasicInfo, lastModified } = usePortfolio()
  const { basicInfo, skills, sections } = aboutMeData

  const [tab, setTab]                   = useState(0)
  const [skillAnimate, setSkillAnimate] = useState(false)
  const [snackOpen, setSnackOpen]       = useState(false)
  const fileInputRef                    = useRef(null)
  const prevModified                    = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setSkillAnimate(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (lastModified && lastModified !== prevModified.current) {
      prevModified.current = lastModified
      setSnackOpen(true)
    }
  }, [lastModified])

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    updateBasicInfo('photo', URL.createObjectURL(file))
  }, [updateBasicInfo])

  const INFO_ITEMS = [
    { Icon: PersonOutlinedIcon, label: '이름',    value: basicInfo.name },
    { Icon: WorkOutlineIcon,    label: '경력',    value: basicInfo.experience },
    { Icon: CakeOutlinedIcon,   label: '생년월일', value: basicInfo.birthDate },
    { Icon: BrushOutlinedIcon,  label: '직무',    value: basicInfo.role },
  ]

  return (
    <Box
      component="main"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: C.bg,
        py: { xs: 5, sm: 6, md: 10 },
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>

        {/* ── 헤더 ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{ color: C.accentLight, letterSpacing: { xs: 2, md: 4 }, fontSize: { xs: '0.7rem', md: '0.8rem' }, mb: 1, display: 'block' }}
          >
            ABOUT ME
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.8rem' }, fontWeight: 700, color: C.dark }}
          >
            안녕하세요,{' '}
            <Box component="span" sx={{ color: C.accent }}>{basicInfo.name}</Box>입니다
          </Typography>
          <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', mt: { xs: 2, md: 3 }, border: 'none' }} />
        </Box>

        {/* ── 프로필 카드 ── */}
        <Card elevation={0} sx={{ bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 3, mb: { xs: 2.5, md: 3 } }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 3, sm: 3, md: 4 }} alignItems="center">

              {/* 프로필 이미지 */}
              <Grid item xs={12} sm="auto" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} aria-label="프로필 사진 파일 선택" />
                <Tooltip title="클릭하여 사진 변경" placement="bottom" arrow>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        role="button" tabIndex={0} aria-label="프로필 사진 변경"
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                        sx={{ width: { xs: 32, md: 34 }, height: { xs: 32, md: 34 }, borderRadius: '50%', bgcolor: C.accent, border: `2px solid ${C.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { bgcolor: C.accentDark }, outline: 'none', '&:focus-visible': { boxShadow: `0 0 0 3px ${C.accent}50` } }}
                      >
                        <CameraAltOutlinedIcon sx={{ color: '#fff', fontSize: { xs: 14, md: 16 } }} />
                      </Box>
                    }
                  >
                    <Avatar
                      src={basicInfo.photo}
                      alt={`${basicInfo.name} 프로필 사진`}
                      imgProps={{ loading: 'lazy' }}
                      onClick={() => fileInputRef.current?.click()}
                      sx={{
                        // 모바일 110 → 태블릿 130 → 데스크탑 140
                        width:  { xs: 110, sm: 130, md: 140 },
                        height: { xs: 110, sm: 130, md: 140 },
                        bgcolor: '#1C0A14', border: `3px solid ${C.accent}`,
                        fontSize: { xs: '2.8rem', sm: '3.2rem', md: '3.5rem' },
                        fontWeight: 700, color: '#F2EDE8', cursor: 'pointer',
                        transition: 'opacity 0.2s, transform 0.2s',
                        '&:hover': { opacity: 0.85, transform: 'scale(1.03)' },
                      }}
                    >
                      {basicInfo.name.charAt(0)}
                    </Avatar>
                  </Badge>
                </Tooltip>
                <Typography variant="caption" sx={{ color: C.light, mt: 1.5, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                  클릭하여 사진 업로드
                </Typography>
              </Grid>

              {/* 인적사항 */}
              <Grid item xs={12} sm>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.8, md: 1 }, mb: { xs: 1.5, md: 2 } }}>
                  <Chip label={basicInfo.role}       size="small" sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700 }} />
                  <Chip label={basicInfo.experience} size="small" sx={{ bgcolor: `${C.accent}12`, color: C.accent, border: `1px solid ${C.accent}40`, fontWeight: 600 }} />
                </Box>
                <Divider sx={{ borderColor: C.border, mb: 1 }} />
                {INFO_ITEMS.map(({ Icon, label, value }) => (
                  <InfoRow key={label} Icon={Icon} label={label} value={value} />
                ))}
                <Divider sx={{ borderColor: C.border, my: { xs: 1.5, md: 2 } }} />
                <Typography
                  variant="body2"
                  sx={{ color: C.mid, lineHeight: { xs: 1.8, md: 2 }, fontStyle: 'italic', borderLeft: `3px solid ${C.accent}`, pl: 2, py: 0.5, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                >
                  {basicInfo.intro}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ── 탭 섹션 ── */}
        <Card elevation={0} sx={{ bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              aria-label="About Me 섹션 탭"
              // 모바일에서 탭 텍스트 넘침 방지
              variant={isMobile ? 'fullWidth' : 'standard'}
              sx={{
                borderBottom: `1px solid ${C.border}`,
                '& .MuiTab-root': {
                  fontWeight: 600, color: C.light, textTransform: 'none',
                  fontSize: { xs: '0.82rem', sm: '0.85rem', md: '0.9rem' },
                  // 터치 최소 높이 44px
                  minHeight: { xs: 44, md: 48 },
                  px: { xs: 1, md: 2 },
                },
                '& .Mui-selected': { color: C.accent },
                '& .MuiTabs-indicator': { bgcolor: C.accent, height: 3, borderRadius: '3px 3px 0 0' },
              }}
            >
              <Tab label="보유 스킬"  id="tab-0" aria-controls="panel-0" />
              <Tab label="자격증"    id="tab-1" aria-controls="panel-1" />
              <Tab
                id="tab-2" aria-controls="panel-2"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EditOutlinedIcon sx={{ fontSize: { xs: 13, md: 15 } }} />
                    내 이야기
                  </Box>
                }
              />
            </Tabs>

            {/* ── 스킬 탭 ── */}
            <TabPanel value={tab} index={0} id="panel-0" labelledBy="tab-0">
              {/* 숙련도 기준: 모바일은 컴팩트, 태블릿+는 전체 표시 */}
              <Box
                sx={{
                  bgcolor: `${C.accent}07`, border: `1px solid ${C.accent}20`,
                  borderRadius: 2, p: { xs: 1.5, md: 2 }, mb: { xs: 2, md: 3 },
                  display: 'flex', flexWrap: 'wrap',
                  gap: { xs: 1, md: 2 },
                }}
              >
                <Typography variant="caption" sx={{ color: C.light, width: '100%', fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                  숙련도 기준
                </Typography>
                {SKILL_LEVELS.map(lv => (
                  <Box key={lv.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: lv.color, flexShrink: 0 }} />
                    {/* 모바일: 짧은 라벨 / 태블릿+: 전체 라벨 */}
                    <Typography variant="caption" sx={{ color: lv.color, fontWeight: 700, fontSize: { xs: '0.7rem', md: '0.72rem' } }}>
                      {isMobile ? lv.label : lv.fullLabel}
                    </Typography>
                    {/* 데스크탑에서만 설명 표시 */}
                    {!isMobile && (
                      <Typography variant="caption" sx={{ color: C.light, fontSize: '0.72rem' }}>
                        — {lv.desc}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>
                {skills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} animate={skillAnimate} onLevelChange={updateSkillLevel} />
                ))}
              </Box>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: C.light, mt: 2, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                슬라이더를 조정하면 홈 탭 스킬 섹션에 즉시 반영됩니다
              </Typography>
            </TabPanel>

            {/* ── 자격증 탭 ── */}
            <TabPanel value={tab} index={1} id="panel-1" labelledBy="tab-1">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>
                {CERTS.map(cert => <CertCard key={cert.name} cert={cert} />)}
              </Box>
              <Box sx={{ mt: { xs: 2, md: 3 }, p: { xs: 1.5, md: 2 }, bgcolor: `${C.accent}07`, border: `1px solid ${C.accent}20`, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: C.light, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                  모든 자격증은 공식 기관을 통해 취득하였습니다
                </Typography>
              </Box>
            </TabPanel>

            {/* ── 내 이야기 탭 ── */}
            <TabPanel value={tab} index={2} id="panel-2" labelledBy="tab-2">
              <Box sx={{ bgcolor: `${C.accent}07`, border: `1px solid ${C.accent}20`, borderRadius: 2, p: { xs: 1.5, md: 2 }, mb: { xs: 2, md: 3 } }}>
                <Typography variant="caption" sx={{ color: C.mid, fontSize: { xs: '0.72rem', md: '0.75rem' } }}>
                  <Box component="span" sx={{ color: C.accent, fontWeight: 700 }}>홈 노출</Box>
                  {' '}표시된 섹션은 홈 탭 About 섹션에 자동으로 표시됩니다.{isMobile ? '' : ' 입력 후 300ms 내에 반영됩니다.'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>
                {sections.map(section => (
                  <SectionEditor key={section.id} section={section} onChange={updateSection} />
                ))}
              </Box>
            </TabPanel>
          </CardContent>
        </Card>

      </Container>

      {/* ── 홈 반영 확인 스낵바 ── */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        // 모바일 키보드 오픈 시 겹침 방지 → top 배치 옵션
        anchorOrigin={{ vertical: isMobile ? 'top' : 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
          sx={{ bgcolor: C.accent, color: '#fff', '& .MuiAlert-icon': { color: '#fff' }, borderRadius: 2, fontSize: { xs: '0.8rem', md: '0.85rem' } }}
        >
          홈 탭에 반영되었습니다 ✓
        </Alert>
      </Snackbar>
    </Box>
  )
}
