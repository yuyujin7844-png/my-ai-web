import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  TextField, Button, CircularProgress, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

function randomSeed() {
  return `ms_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
}

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [seed, setSeed] = useState(randomSeed);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const imageUrl = `https://picsum.photos/seed/${seed}/400/400`;

  const handleSubmit = async () => {
    if (!caption.trim()) { setError('게시물 내용을 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    const tagsArray = hashtags.trim()
      ? hashtags.trim().split(/\s+/).map((t) => (t.startsWith('#') ? t : `#${t}`))
      : [];
    const { error: err } = await supabase.from('ms_posts').insert({
      user_id: user.id,
      caption: caption.trim(),
      image_url: imageUrl,
      hashtags: tagsArray,
    });
    setLoading(false);
    if (err) { setError('게시물 등록 중 오류가 발생했습니다.'); return; }
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5ECD7', maxWidth: 480, mx: 'auto' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>게시물 작성</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Image preview + change button */}
        <Box sx={{ position: 'relative', mb: 2, borderRadius: 3, overflow: 'hidden' }}>
          <Box
            component="img"
            src={imageUrl}
            alt="preview"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
          />
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            size="small"
            onClick={() => setSeed(randomSeed())}
            sx={{
              position: 'absolute', bottom: 12, right: 12,
              bgcolor: 'rgba(255,249,240,0.92)', color: '#5D4037',
              '&:hover': { bgcolor: '#FFF9F0' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            이미지 변경
          </Button>
        </Box>

        <TextField
          multiline rows={4} fullWidth
          placeholder="영화나 공연에 대한 감상을 남겨보세요... 🎬"
          value={caption} onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          placeholder="#해시태그1 #해시태그2 (띄어쓰기로 구분)"
          value={hashtags} onChange={(e) => setHashtags(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <Button
          variant="contained" fullWidth size="large"
          onClick={handleSubmit} disabled={loading}
          sx={{ py: 1.5, fontSize: 16 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : '게시물 등록'}
        </Button>
      </Box>
    </Box>
  );
}
