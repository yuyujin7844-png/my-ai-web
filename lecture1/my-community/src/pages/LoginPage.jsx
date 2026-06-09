import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, TextField, Button, Typography, Paper, Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../lib/api';
import Logo from '../components/Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginUser(form);
      login(user);
      navigate('/main');
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
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            border: '2px solid',
            borderColor: 'primary.light',
            boxShadow: '0 8px 40px rgba(249,199,79,0.18)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Logo />
          </Box>

          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
            로그인
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="아이디"
              name="username"
              value={form.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ py: 1.5, borderColor: 'primary.main', color: 'primary.dark' }}
            >
              회원가입하기
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
