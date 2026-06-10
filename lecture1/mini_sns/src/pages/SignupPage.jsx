import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Alert, CircularProgress,
  AppBar, Toolbar, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', nickname: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.username || !form.password || !form.nickname) {
      setError('아이디, 비밀번호, 닉네임은 필수입니다.');
      return;
    }
    if (form.username.length < 3) { setError('아이디는 3자 이상이어야 합니다.'); return; }
    if (form.password.length < 4) { setError('비밀번호는 4자 이상이어야 합니다.'); return; }
    setLoading(true);
    setError('');

    const { data: existing } = await supabase.from('ms_users').select('id').eq('username', form.username).single();
    if (existing) { setError('이미 사용 중인 아이디입니다.'); setLoading(false); return; }

    const profileUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(form.username)}`;
    const { data, error: err } = await supabase
      .from('ms_users')
      .insert({ username: form.username, password: form.password, nickname: form.nickname, profile_image_url: profileUrl })
      .select()
      .single();
    setLoading(false);
    if (err || !data) { setError('회원가입 중 오류가 발생했습니다.'); return; }
    login(data);
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5ECD7', maxWidth: 480, mx: 'auto' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>회원가입</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          🍿 Moviestagram과 함께 영화·공연 이야기를 나눠보세요!
        </Typography>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
        <TextField fullWidth name="username" label="아이디 (3자 이상)" value={form.username} onChange={handleChange} />
        <TextField fullWidth name="password" label="비밀번호 (4자 이상)" type="password" value={form.password} onChange={handleChange} />
        <TextField fullWidth name="nickname" label="닉네임" value={form.nickname} onChange={handleChange} />
        <TextField fullWidth name="email" label="이메일 (선택)" type="email" value={form.email} onChange={handleChange} />
        <Button
          variant="contained" fullWidth size="large"
          onClick={handleSubmit} disabled={loading}
          sx={{ py: 1.5, fontSize: 16, mt: 0.5 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : '회원가입'}
        </Button>
      </Box>
    </Box>
  );
}
