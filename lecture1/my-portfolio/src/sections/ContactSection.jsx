import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { SiGithub, SiInstagram } from 'react-icons/si'
import supabase from '../lib/supabase'

const C = {
  bg: '#F5EFE6',
  cardBg: '#FDFAF7',
  brown: '#8B5E3C',
  brownDark: '#6B4A2F',
  brownLight: '#C4A882',
  textDark: '#4A3728',
  textMid: '#9C8272',
  border: '#D4C4B0',
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: C.bg,
    '& fieldset': { borderColor: C.border },
    '&:hover fieldset': { borderColor: C.brownLight },
    '&.Mui-focused fieldset': { borderColor: C.brown },
  },
  '& .MuiInputLabel-root': { color: C.textMid },
  '& .MuiInputLabel-root.Mui-focused': { color: C.brown },
  '& .MuiInputBase-input': { color: C.textDark },
}

const CONTACT_ITEMS = [
  {
    icon: <EmailOutlinedIcon fontSize="small" />,
    label: 'yuyujin7844@gmail.com',
    href: 'mailto:yuyujin7844@gmail.com',
  },
  {
    icon: <SiGithub size={18} />,
    label: 'github.com/yuyujin7844-png',
    href: 'https://github.com/yuyujin7844-png',
  },
]

const SNS_LINKS = [
  { icon: <SiGithub size={22} />, href: 'https://github.com/yuyujin7844-png', label: 'GitHub' },
  { icon: <SiInstagram size={22} />, href: '#', label: 'Instagram' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    setLoading(true)
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setSubmitting(true)
    setError(null)
    const { error: err } = await supabase
      .from('guestbook')
      .insert({ name: form.name.trim(), message: form.message.trim() })
    if (err) {
      setError('메시지 전송에 실패했습니다. 다시 시도해주세요.')
    } else {
      setSuccess(true)
      setForm({ name: '', message: '' })
      fetchMessages()
      setTimeout(() => setSuccess(false), 3000)
    }
    setSubmitting(false)
  }

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: C.bg, textAlign: 'center' }}>
      <Container maxWidth="sm">

        {/* 헤더 */}
        <Typography
          variant="overline"
          sx={{ color: C.brown, letterSpacing: 4, fontSize: '0.75rem', mb: 1, display: 'block' }}
        >
          CONTACT
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 700, color: C.textDark, mb: 2 }}
        >
          함께 이야기해요
        </Typography>
        <Box sx={{ width: 40, height: 2, bgcolor: C.brown, mx: 'auto', my: 3, borderRadius: 1 }} />
        <Typography variant="body1" sx={{ color: C.textMid, mb: 5, lineHeight: 1.9 }}>
          언제든지 편하게 연락주세요 ☕
        </Typography>

        {/* 연락처 정보 (세로 나열) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 4 }}>
          {CONTACT_ITEMS.map((item, i) => (
            <Box
              key={i}
              component="a"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: C.textDark,
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': { color: C.brown },
              }}
            >
              <Box sx={{ color: C.brown, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'inherit', fontSize: '0.95rem' }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* SNS 동그란 아이콘 버튼 */}
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
                width: 48,
                height: 48,
                bgcolor: C.cardBg,
                border: `1.5px solid ${C.border}`,
                color: C.textDark,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: C.brown, color: '#fff', borderColor: C.brown },
              }}
            >
              {sns.icon}
            </IconButton>
          ))}
        </Box>

        {/* 구분선 */}
        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: 7 }} />

        {/* 방명록 헤더 */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: C.textDark, mb: 1, fontSize: '1.2rem' }}>
          방명록
        </Typography>
        <Typography variant="body2" sx={{ color: C.textMid, mb: 4 }}>
          방문해 주셔서 감사해요. 한 마디 남겨주세요 🌿
        </Typography>

        {/* 방명록 입력 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: C.cardBg,
            border: `1px solid ${C.border}`,
            borderRadius: 3,
            p: 3,
            mb: 4,
            textAlign: 'left',
          }}
        >
          <TextField
            fullWidth
            label="이름"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            size="small"
            sx={{ mb: 2, ...inputSx }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="메시지"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            sx={{ mb: 2, ...inputSx }}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '0.85rem' }}>{error}</Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, fontSize: '0.85rem' }}>
              메시지가 전송되었습니다 💌
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            fullWidth
            sx={{
              bgcolor: C.brown,
              color: '#fff',
              py: 1.2,
              fontWeight: 600,
              fontSize: '0.95rem',
              '&:hover': { bgcolor: C.brownDark },
              '&.Mui-disabled': { bgcolor: C.brownLight, color: '#fff' },
            }}
          >
            {submitting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : '남기기'}
          </Button>
        </Box>

        {/* 방명록 메시지 목록 */}
        {loading ? (
          <Box sx={{ py: 4 }}>
            <CircularProgress sx={{ color: C.brown }} size={32} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.length === 0 ? (
              <Typography variant="body2" color={C.textMid} sx={{ py: 3 }}>
                아직 방명록이 없습니다. 첫 번째 방문자가 되어주세요! 🎉
              </Typography>
            ) : (
              messages.map(msg => (
                <Box
                  key={msg.id}
                  sx={{
                    bgcolor: C.cardBg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 2,
                    p: 2.5,
                    textAlign: 'left',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                    <Typography variant="body2" fontWeight={700} color={C.textDark}>
                      {msg.name}
                    </Typography>
                    <Typography variant="caption" color={C.textMid}>
                      {new Date(msg.created_at).toLocaleDateString('ko-KR')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color={C.textMid} sx={{ lineHeight: 1.7 }}>
                    {msg.message}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}

        {/* 푸터 */}
        <Box sx={{ borderTop: `1px solid ${C.border}`, mt: 8, pt: 4 }}>
          <Typography variant="body2" sx={{ color: C.textMid, fontSize: '0.85rem' }}>
            © 2026 Portfolio. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
