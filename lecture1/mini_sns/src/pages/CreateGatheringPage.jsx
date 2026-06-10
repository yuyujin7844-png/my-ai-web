import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  TextField, Button, CircularProgress, Alert,
  Select, MenuItem, FormControl, InputLabel,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import MovieIcon from '@mui/icons-material/Movie';
import EventIcon from '@mui/icons-material/Event';

export default function CreateGatheringPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location: '',
    date: '',
    contentName: '',
    showTime: '',
    meetPlace: '',
    meetTime: '',
    maxMembers: 4,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const generatedTitle = [form.location, form.date, form.contentName]
    .filter(Boolean)
    .join(' · ');

  const handleSubmit = () => {
    if (!form.location || !form.date || !form.contentName) {
      setError('위치, 날짜, 공연·영화 이름은 필수입니다.');
      return;
    }
    if (!form.meetPlace || !form.meetTime) {
      setError('모임 장소와 시간을 입력해주세요.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`모임이 생성되었습니다!\n"${generatedTitle}"`);
      navigate('/gathering');
    }, 800);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5ECD7', maxWidth: 480, mx: 'auto' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>모임 만들기</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 미리보기 타이틀 */}
        {generatedTitle && (
          <Box sx={{ p: 1.5, bgcolor: '#FFF9F0', borderRadius: 2, border: '1px solid #E8D5B7' }}>
            <Typography variant="caption" color="text.secondary">모임 제목 미리보기</Typography>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#3E2723', mt: 0.3 }}>
              {generatedTitle}
            </Typography>
          </Box>
        )}

        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

        <Divider sx={{ borderColor: '#E8D5B7' }}>
          <Typography variant="caption" color="text.secondary">📍 모임 제목 정보</Typography>
        </Divider>

        {/* 위치 */}
        <TextField
          fullWidth label="위치" placeholder="예: 서울 강남구"
          value={form.location} onChange={handleChange('location')}
          InputProps={{ startAdornment: <LocationOnIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} /> }}
        />

        {/* 날짜 */}
        <TextField
          fullWidth label="날짜" type="date"
          value={form.date} onChange={handleChange('date')}
          InputLabelProps={{ shrink: true }}
          InputProps={{ startAdornment: <EventIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} /> }}
        />

        {/* 공연/영화 이름 */}
        <TextField
          fullWidth label="영화·공연 제목" placeholder="예: 인사이드 아웃 3"
          value={form.contentName} onChange={handleChange('contentName')}
          InputProps={{ startAdornment: <MovieIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} /> }}
        />

        <Divider sx={{ borderColor: '#E8D5B7' }}>
          <Typography variant="caption" color="text.secondary">🎬 공연·상영 정보</Typography>
        </Divider>

        {/* 공연 시간 */}
        <TextField
          fullWidth label="공연·상영 시간" placeholder="예: 오후 7:30"
          value={form.showTime} onChange={handleChange('showTime')}
          InputProps={{ startAdornment: <AccessTimeIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} /> }}
        />

        <Divider sx={{ borderColor: '#E8D5B7' }}>
          <Typography variant="caption" color="text.secondary">🤝 모임 정보</Typography>
        </Divider>

        {/* 모임 장소 */}
        <TextField
          fullWidth label="모임 장소" placeholder="예: CGV 강남 1관 앞"
          value={form.meetPlace} onChange={handleChange('meetPlace')}
          InputProps={{ startAdornment: <LocationOnIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} /> }}
        />

        {/* 모임 시간 */}
        <TextField
          fullWidth label="모임 시간" placeholder="예: 오후 7:00 (상영 30분 전)"
          value={form.meetTime} onChange={handleChange('meetTime')}
          InputProps={{ startAdornment: <AccessTimeIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} /> }}
        />

        {/* 인원 드롭다운 */}
        <FormControl fullWidth>
          <InputLabel>모집 인원</InputLabel>
          <Select
            value={form.maxMembers}
            label="모집 인원"
            onChange={handleChange('maxMembers')}
            sx={{ bgcolor: '#FFF9F0' }}
            startAdornment={<PeopleIcon sx={{ mr: 1, color: '#C4956A', fontSize: 20 }} />}
          >
            {Array.from({ length: 19 }, (_, i) => i + 2).map((n) => (
              <MenuItem key={n} value={n}>{n}명</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained" fullWidth size="large"
          onClick={handleSubmit} disabled={loading}
          sx={{ py: 1.5, fontSize: 16, mt: 0.5 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : '모임 만들기 🎬'}
        </Button>
      </Box>
    </Box>
  );
}
