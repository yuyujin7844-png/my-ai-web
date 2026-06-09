import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, TextField, Button, Typography, Paper, Alert,
  InputAdornment,
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { registerUser, checkUsername } from '../lib/api';
import Logo from '../components/Logo';

const PASSWORD_RULES = [
  { label: '8자 이상', check: (p) => p.length >= 8 },
  { label: '영문 포함', check: (p) => /[a-zA-Z]/.test(p) },
  { label: '숫자 포함', check: (p) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', nickname: '', password: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'username') setUsernameStatus('');
  };

  const handleCheckUsername = async () => {
    if (!form.username.trim()) return;
    const isDuplicate = await checkUsername(form.username.trim());
    setUsernameStatus(isDuplicate ? 'duplicate' : 'available');
  };

  const isPasswordValid = PASSWORD_RULES.every((r) => r.check(form.password));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!isPasswordValid) { setError('비밀번호 규칙을 확인해주세요.'); return; }
    if (usernameStatus === 'duplicate') { setError('이미 사용 중인 아이디입니다.'); return; }
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess('회원가입 완료! 로그인 페이지로 이동합니다.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3CD 50%, #FFECB3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.92)',
            border: '2px solid',
            borderColor: 'primary.light',
            boxShadow: '0 8px 40px rgba(249,199,79,0.18)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Logo size="small" />
          </Box>

          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
            회원가입
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="아이디"
              name="username"
              value={form.username}
              onChange={handleChange}
              sx={{ mb: 1 }}
              required
              color={
                usernameStatus === 'available' ? 'success' :
                usernameStatus === 'duplicate' ? 'error' : 'primary'
              }
              helperText={
                usernameStatus === 'available' ? '✅ 사용 가능한 아이디입니다.' :
                usernameStatus === 'duplicate' ? '❌ 이미 사용 중인 아이디입니다.' : ' '
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button size="small" onClick={handleCheckUsername} sx={{ fontSize: 12 }}>
                      중복확인
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 1, mt: 1 }}
              required
            />

            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: form.password ? 'primary.light' : 'grey.100',
                opacity: form.password ? 1 : 0.5,
                transition: 'all 0.3s',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                비밀번호 규칙
              </Typography>
              {PASSWORD_RULES.map((rule) => (
                <Box key={rule.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {rule.check(form.password) ? (
                    <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: 'success.main' }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  )}
                  <Typography variant="caption" color={rule.check(form.password) ? 'success.main' : 'text.disabled'}>
                    {rule.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <TextField
              fullWidth
              label="닉네임"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="주소"
              name="address"
              value={form.address}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mb: 1 }}
            >
              {loading ? '가입 중...' : '회원가입하기'}
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/')}
              sx={{ color: 'text.secondary' }}
            >
              이미 계정이 있으신가요? 로그인
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
