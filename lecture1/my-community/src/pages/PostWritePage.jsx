import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Paper, Typography, TextField, Button,
  Select, MenuItem, FormControl, InputLabel, Chip, IconButton,
  Alert, CircularProgress, Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../lib/api';
import PageHeader from '../components/PageHeader';

const CATEGORIES = ['인기스팟', '반려스테이', '함께해요', 'Q&A'];

export default function PostWritePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    image_url: '',
    hashtags: [],
  });
  const [hashtagInput, setHashtagInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRandomImage = () => {
    setImageLoading(true);
    const seed = Math.floor(Math.random() * 1000);
    setForm({ ...form, image_url: `https://picsum.photos/seed/${seed}/600/400` });
    setImageLoading(false);
  };

  const handleAddHashtag = (e) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      const tag = hashtagInput.trim().replace(/^#/, '');
      if (tag && !form.hashtags.includes(tag)) {
        setForm({ ...form, hashtags: [...form.hashtags, tag] });
      }
      setHashtagInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) { setError('카테고리를 선택해주세요.'); return; }
    setError('');
    setLoading(true);
    try {
      await createPost({
        ...form,
        author_id: user.id,
        author_nickname: user.nickname,
      });
      navigate('/main');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        left={<IconButton onClick={() => navigate('/main')}><ArrowBackIcon /></IconButton>}
      />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark" sx={{ mb: 3 }}>
          게시물 작성
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '2px solid',
            borderColor: 'primary.light',
            boxShadow: '0 4px 24px rgba(249,199,79,0.15)',
          }}
        >
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="제목"
              name="title"
              value={form.title}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }} required>
              <InputLabel>카테고리</InputLabel>
              <Select
                name="category"
                value={form.category}
                label="카테고리"
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="내용"
              name="content"
              value={form.content}
              onChange={handleChange}
              multiline
              rows={5}
              sx={{ mb: 2 }}
              required
            />

            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={imageLoading ? <CircularProgress size={16} /> : <ImageIcon />}
                onClick={handleRandomImage}
                disabled={imageLoading}
                sx={{ borderColor: 'primary.main', color: 'primary.dark' }}
              >
                랜덤 이미지 추가
              </Button>
              {form.image_url && (
                <Box sx={{ mt: 1.5, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'primary.light' }}>
                  <img
                    src={form.image_url}
                    alt="미리보기"
                    style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }}
                  />
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              label="해시태그 (Enter로 추가)"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleAddHashtag}
              sx={{ mb: 1 }}
              placeholder="#강아지 #반려동물"
            />

            {form.hashtags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" sx={{ mb: 3, gap: 1 }}>
                {form.hashtags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    onDelete={() => setForm({ ...form, hashtags: form.hashtags.filter((t) => t !== tag) })}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            )}

            <Box sx={{ mt: form.hashtags.length > 0 ? 0 : 2 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? '등록 중...' : '게시물 등록'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
