import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('아이디와 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('ms_users')
      .select('*')
      .eq('username', form.username)
      .eq('password', form.password)
      .single();
    setLoading(false);
    if (err || !data) { setError('아이디 또는 비밀번호가 올바르지 않습니다.'); return; }
    login(data);
    navigate('/');
  };

  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#F5ECD7',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', p: 3,
      maxWidth: 480, mx: 'auto',
    }}>
      {/* Logo */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 72, lineHeight: 1, mb: 1 }}>🍿</Typography>
        <Typography variant="h4" fontWeight={900} sx={{ color: '#5D4037', letterSpacing: -1, fontStyle: 'italic' }}>
          Moviestagram
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          영화와 공연의 감성을 공유하세요
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
        <TextField fullWidth name="username" label="아이디" value={form.username} onChange={handleChange} autoComplete="username" />
        <TextField fullWidth name="password" label="비밀번호" type="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
        <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ py: 1.5, fontSize: 16, mt: 0.5 }}>
          {loading ? <CircularProgress size={22} color="inherit" /> : '로그인'}
        </Button>
        <Button component={RouterLink} to="/signup" variant="outlined" fullWidth size="large"
          sx={{ py: 1.5, fontSize: 16, borderColor: '#C4956A', color: '#8B6347', '&:hover': { borderColor: '#8B6347' } }}>
          회원가입
        </Button>
      </Box>

      <Typography variant="caption" color="text.disabled" sx={{ mt: 4 }}>
        데모 계정: movie_lover / pass123
      </Typography>
    </Box>
  );
}
