import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  TextField, Button, CircularProgress, Alert,
  Select, MenuItem, FormControl, InputLabel, Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['영화', '공연', '뮤지컬', '연극', '오페라', '콘서트', '전시'];

function randomSeed() {
  return `ms_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
}

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [seed, setSeed] = useState(randomSeed);
  const [category, setCategory] = useState('영화');
  const [contentTitle, setContentTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const imageUrl = `https://picsum.photos/seed/${seed}/400/400`;

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const raw = tagInput.trim().replace(/^#+/, '');
      if (raw && !tags.includes(`#${raw}`)) {
        setTags((prev) => [...prev, `#${raw}`]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSubmit = async () => {
    if (!caption.trim()) { setError('게시물 내용을 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    const fullCaption = contentTitle.trim()
      ? `[${category}] ${contentTitle.trim()}\n${caption.trim()}`
      : caption.trim();
    const { error: err } = await supabase.from('ms_posts').insert({
      user_id: user.id,
      caption: fullCaption,
      image_url: imageUrl,
      hashtags: tags,
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
        {/* 카테고리 + 제목 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel>분류</InputLabel>
            <Select
              value={category}
              label="분류"
              onChange={(e) => setCategory(e.target.value)}
              sx={{ bgcolor: '#FFF9F0', borderRadius: 2 }}
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small" fullWidth
            placeholder="제목 직접 입력 (예: 인사이드 아웃 3)"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
          />
        </Box>

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

        {/* 해시태그 입력 */}
        <TextField
          fullWidth size="small"
          placeholder="해시태그 입력 후 Enter (예: 감동, 추천)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          sx={{ mb: tags.length > 0 ? 1 : 2 }}
          helperText="Enter를 누르면 #이 자동으로 붙습니다"
        />
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
            {tags.map((tag) => (
              <Chip
                key={tag} label={tag} size="small"
                onDelete={() => removeTag(tag)}
                sx={{ bgcolor: '#F5ECD7', color: '#8B6347', fontWeight: 600, border: '1px solid #E8D5B7' }}
              />
            ))}
          </Box>
        )}

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
