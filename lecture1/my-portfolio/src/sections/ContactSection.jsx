import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Rating from '@mui/material/Rating'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'
import Popover from '@mui/material/Popover'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SiGithub, SiInstagram, SiFacebook, SiX } from 'react-icons/si'
import supabase from '../lib/supabase'

const C = {
  bg: '#EDE7E1',
  cardBg: '#F7F3EF',
  accent: '#8B1A2F',
  accentLight: '#B5253E',
  accentDark: '#6B1D35',
  textDark: '#1A1A1A',
  textMid: '#555555',
  textLight: '#888888',
  border: '#D9D0C8',
  inputBg: '#F7F3EF',
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: C.inputBg,
    '& fieldset': { borderColor: C.border },
    '&:hover fieldset': { borderColor: '#C4B8B0' },
    '&.Mui-focused fieldset': { borderColor: C.accent },
  },
  '& .MuiInputLabel-root': { color: C.textLight },
  '& .MuiInputLabel-root.Mui-focused': { color: C.accent },
  '& .MuiInputBase-input': { color: C.textDark },
}

const EMOJIS = ['😊', '😄', '🎉', '👏', '💪', '🌟', '✨', '🚀', '💯', '❤️', '🙌', '😍']

// SNS 플랫폼 매핑
const SNS_PLATFORMS = [
  { value: 'instagram', label: 'Instagram', formKey: 'snsInstagram', icon: <SiInstagram size={13} /> },
  { value: 'facebook',  label: 'Facebook',  formKey: 'snsFacebook',  icon: <SiFacebook size={13} /> },
  { value: 'twitter',   label: 'X (Twitter)', formKey: 'snsTwitter', icon: <SiX size={13} /> },
]

// SNS 링크 버튼 (포트폴리오 본인 계정)
const SNS_LINKS = [
  { icon: <SiGithub size={20} />,    href: 'https://github.com/yuyujin7844-png', label: 'GitHub' },
  { icon: <SiInstagram size={20} />, href: '#', label: 'Instagram' },
  { icon: <SiFacebook size={20} />,  href: '#', label: 'Facebook' },
]

const INIT_FORM = {
  name: '', message: '', affiliation: '',
  email: '', emailPublic: false,
  snsInstagram: '', snsFacebook: '', snsTwitter: '',
  emoji: '', rating: 0,
}

export default function ContactSection() {
  const [form, setForm]           = useState(INIT_FORM)
  const [snsInput, setSnsInput]   = useState({ platform: 'instagram', username: '' })
  const [emojiAnchor, setEmojiAnchor] = useState(null)
  const [messages, setMessages]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState(null)
  const [success, setSuccess]     = useState(false)

  useEffect(() => { fetchMessages() }, [])

  async function fetchMessages() {
    setLoading(true)
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  // SNS 입력: 엔터 누르면 @ 붙여서 저장
  function handleSnsEnter(e) {
    if (e.key !== 'Enter') return
    e.preventDefault()
    const raw = snsInput.username.trim().replace(/^@/, '')
    if (!raw) return
    const platform = SNS_PLATFORMS.find(p => p.value === snsInput.platform)
    set(platform.formKey, `@${raw}`)
    setSnsInput(prev => ({ ...prev, username: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setSubmitting(true)
    setError(null)

    const payload = {
      name:          form.name.trim(),
      message:       form.message.trim(),
      affiliation:   form.affiliation.trim() || null,
      email:         form.email.trim() || null,
      email_public:  form.email.trim() ? form.emailPublic : false,
      sns_instagram: form.snsInstagram || null,
      sns_facebook:  form.snsFacebook  || null,
      sns_twitter:   form.snsTwitter   || null,
      emoji:         form.emoji || null,
      rating:        form.rating || null,
    }

    const { error: err } = await supabase.from('guestbook').insert(payload)
    if (err) {
      setError('전송에 실패했습니다. 다시 시도해주세요.')
    } else {
      setSuccess(true)
      setForm(INIT_FORM)
      fetchMessages()
      setTimeout(() => setSuccess(false), 3000)
    }
    setSubmitting(false)
  }

  const emojiOpen = Boolean(emojiAnchor)

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: C.bg, textAlign: 'center' }}>
      <Container maxWidth="sm">

        {/* 헤더 */}
        <Typography
          variant="overline"
          sx={{ color: C.accentLight, letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}
        >
          CONTACT
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, color: C.textDark, mb: 2 }}
        >
          함께 이야기해요
        </Typography>
        <Divider sx={{ width: 60, height: 3, bgcolor: C.accent, mx: 'auto', my: 3, border: 'none' }} />
        <Typography variant="body1" sx={{ color: C.textMid, mb: 5, lineHeight: 1.9 }}>
          언제든지 편하게 연락주세요 ☕
        </Typography>

        {/* 이메일만 표시 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box
            component="a"
            href="mailto:yuyujin7844@gmail.com"
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              color: C.textDark, textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: C.accent },
            }}
          >
            <Box sx={{ color: C.accent, display: 'flex', alignItems: 'center' }}>
              <EmailOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'inherit', fontSize: '0.95rem' }}>
              yuyujin7844@gmail.com
            </Typography>
          </Box>
        </Box>

        {/* SNS 동그란 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 7 }}>
          {SNS_LINKS.map((sns, i) => (
            <IconButton
              key={i}
              component="a"
              href={sns.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sns.label}
              sx={{
                width: 48, height: 48,
                bgcolor: C.cardBg,
                border: `1.5px solid ${C.border}`,
                color: C.textDark,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: C.accent, color: '#fff', borderColor: C.accent },
              }}
            >
              {sns.icon}
            </IconButton>
          ))}
        </Box>

        <Divider sx={{ borderColor: C.border, mb: 7 }} />

        {/* 방명록 */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: C.textDark, mb: 1, fontSize: '1.25rem' }}>
          방명록
        </Typography>
        <Typography variant="body2" sx={{ color: C.textMid, mb: 4 }}>
          방문해 주셔서 감사해요. 한 마디 남겨주세요 🌿
        </Typography>

        {/* 입력 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ bgcolor: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 3, p: 3, mb: 5, textAlign: 'left' }}
        >
          {/* 이름 */}
          <TextField fullWidth required label="이름 *" value={form.name}
            onChange={e => set('name', e.target.value)} size="small" sx={{ mb: 2, ...inputSx }} />

          {/* 메시지 */}
          <TextField fullWidth required multiline rows={3} label="메시지 *" value={form.message}
            onChange={e => set('message', e.target.value)} sx={{ mb: 2, ...inputSx }} />

          {/* 소속/직업 */}
          <TextField fullWidth label="소속 / 직업 (선택)" value={form.affiliation}
            onChange={e => set('affiliation', e.target.value)} size="small" sx={{ mb: 2, ...inputSx }} />

          {/* 이메일 + 공개여부 */}
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 2 }}>
            <TextField
              fullWidth label="이메일 (선택)" value={form.email}
              onChange={e => set('email', e.target.value)}
              size="small" sx={inputSx}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.emailPublic}
                  onChange={e => set('emailPublic', e.target.checked)}
                  size="small"
                  disabled={!form.email.trim()}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: C.accent },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: C.accent },
                  }}
                />
              }
              label={
                <Typography variant="caption" sx={{ color: C.textLight, whiteSpace: 'nowrap' }}>
                  {form.emailPublic ? '공개' : '비공개'}
                </Typography>
              }
              sx={{ mr: 0, mt: 0.3, flexShrink: 0 }}
            />
          </Box>

          {/* SNS 계정 — 드롭다운 + 입력 */}
          <Typography variant="caption" sx={{ color: C.textLight, display: 'block', mb: 1 }}>
            SNS 계정 (선택) — 아이디 입력 후 Enter
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <FormControl size="small" sx={{ minWidth: 140, flexShrink: 0 }}>
              <InputLabel sx={{ color: C.textLight, '&.Mui-focused': { color: C.accent } }}>
                플랫폼
              </InputLabel>
              <Select
                value={snsInput.platform}
                label="플랫폼"
                onChange={e => setSnsInput(prev => ({ ...prev, platform: e.target.value }))}
                sx={{
                  bgcolor: C.inputBg, color: C.textDark,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#C4B8B0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.accent },
                }}
              >
                {SNS_PLATFORMS.map(p => (
                  <MenuItem key={p.value} value={p.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      {p.icon} {p.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              placeholder="아이디 (@ 없이 입력 후 Enter)"
              value={snsInput.username}
              onChange={e => setSnsInput(prev => ({ ...prev, username: e.target.value }))}
              onKeyDown={handleSnsEnter}
              size="small"
              sx={inputSx}
            />
          </Box>

          {/* 추가된 SNS 계정 칩 */}
          {SNS_PLATFORMS.some(p => form[p.formKey]) && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
              {SNS_PLATFORMS.map(p =>
                form[p.formKey] ? (
                  <Chip
                    key={p.value}
                    icon={<Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>{p.icon}</Box>}
                    label={`${p.label}: ${form[p.formKey]}`}
                    onDelete={() => set(p.formKey, '')}
                    size="small"
                    sx={{
                      bgcolor: '#F2E8EB', border: `1px solid ${C.accent}`,
                      color: C.textDark, fontSize: '0.78rem',
                      '& .MuiChip-deleteIcon': { color: C.accent, '&:hover': { color: C.accentDark } },
                    }}
                  />
                ) : null
              )}
            </Box>
          )}

          {/* 이모지 선택 — 드롭다운 버튼 */}
          <Typography variant="caption" sx={{ color: C.textLight, display: 'block', mb: 1 }}>
            오늘 기분은? (선택)
          </Typography>
          <Box sx={{ mb: 2.5 }}>
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={e => setEmojiAnchor(e.currentTarget)}
              sx={{
                borderColor: C.border, color: C.textMid,
                bgcolor: C.inputBg, fontSize: '1rem',
                '&:hover': { borderColor: C.accent, bgcolor: '#F2E8EB' },
                minWidth: 140,
              }}
            >
              {form.emoji || '이모지 선택'}
            </Button>
            <Popover
              open={emojiOpen}
              anchorEl={emojiAnchor}
              onClose={() => setEmojiAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              PaperProps={{
                sx: {
                  p: 1.5, bgcolor: C.cardBg, border: `1px solid ${C.border}`,
                  borderRadius: 2, boxShadow: '0 4px 16px rgba(28,10,20,0.12)',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 240 }}>
                {EMOJIS.map(em => (
                  <Box
                    key={em}
                    onClick={() => { set('emoji', form.emoji === em ? '' : em); setEmojiAnchor(null) }}
                    sx={{
                      width: 38, height: 38,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.4rem', borderRadius: 2, cursor: 'pointer',
                      border: `1.5px solid ${form.emoji === em ? C.accent : 'transparent'}`,
                      bgcolor: form.emoji === em ? '#F2E8EB' : 'transparent',
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: '#F2E8EB', border: `1.5px solid ${C.accentLight}` },
                    }}
                  >
                    {em}
                  </Box>
                ))}
              </Box>
            </Popover>
          </Box>

          {/* 별점 */}
          <Typography variant="caption" sx={{ color: C.textLight, display: 'block', mb: 0.8 }}>
            별점 (선택)
          </Typography>
          <Box sx={{ mb: 2.5 }}>
            <Rating
              value={form.rating}
              onChange={(_, val) => set('rating', val)}
              icon={<StarIcon sx={{ color: C.accent }} />}
              emptyIcon={<StarBorderIcon sx={{ color: C.border }} />}
              size="large"
            />
          </Box>

          {error   && <Alert severity="error"   sx={{ mb: 2, fontSize: '0.85rem' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, fontSize: '0.85rem' }}>메시지가 전송되었습니다 💌</Alert>}

          <Button
            type="submit" variant="contained" disabled={submitting} fullWidth
            sx={{
              bgcolor: C.accent, color: '#fff', py: 1.2, fontWeight: 600, fontSize: '0.95rem',
              '&:hover': { bgcolor: C.accentDark },
              '&.Mui-disabled': { bgcolor: '#C4B8B0', color: '#fff' },
            }}
          >
            {submitting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : '남기기'}
          </Button>
        </Box>

        {/* 메시지 목록 */}
        {loading ? (
          <Box sx={{ py: 4 }}>
            <CircularProgress sx={{ color: C.accent }} size={32} />
          </Box>
        ) : messages.length === 0 ? (
          <Typography variant="body2" color={C.textMid} sx={{ py: 3 }}>
            아직 방명록이 없습니다. 첫 번째 방문자가 되어주세요! 🎉
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map(msg => (
              <Box
                key={msg.id}
                sx={{ bgcolor: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 2, p: 2.5, textAlign: 'left' }}
              >
                {/* 이름 + 이모지 + 날짜 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography variant="body2" fontWeight={700} color={C.textDark}>
                      {msg.name}
                    </Typography>
                    {msg.emoji && (
                      <Typography component="span" sx={{ fontSize: '1.1rem', lineHeight: 1 }}>
                        {msg.emoji}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="caption" color={C.textLight}>
                    {new Date(msg.created_at).toLocaleDateString('ko-KR')}
                  </Typography>
                </Box>

                {/* 소속 + 소속 이모지 */}
                {msg.affiliation && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.8 }}>
                    <Typography variant="caption" sx={{ color: C.accent, fontWeight: 600 }}>
                      {msg.emoji && `${msg.emoji} `}{msg.affiliation}
                    </Typography>
                  </Box>
                )}

                {/* 별점 */}
                {msg.rating && (
                  <Box sx={{ mb: 0.8 }}>
                    <Rating
                      value={msg.rating} readOnly size="small"
                      icon={<StarIcon sx={{ color: C.accent, fontSize: '1rem' }} />}
                      emptyIcon={<StarBorderIcon sx={{ color: C.border, fontSize: '1rem' }} />}
                    />
                  </Box>
                )}

                {/* 메시지 */}
                <Typography variant="body2" color={C.textMid} sx={{ lineHeight: 1.7, mb: msg.email_public && msg.email ? 1 : 0 }}>
                  {msg.message}
                </Typography>

                {/* 이메일 (공개 시) */}
                {msg.email_public && msg.email && (
                  <Typography variant="caption" sx={{ color: C.textLight, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EmailOutlinedIcon sx={{ fontSize: '0.85rem' }} />
                    {msg.email}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* 푸터 */}
        <Box sx={{ borderTop: `1px solid ${C.border}`, mt: 8, pt: 4 }}>
          <Typography variant="body2" sx={{ color: C.textLight, fontSize: '0.85rem' }}>
            © 2026 Portfolio. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
