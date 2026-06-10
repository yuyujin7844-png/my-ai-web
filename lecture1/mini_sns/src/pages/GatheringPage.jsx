import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MovieIcon from '@mui/icons-material/Movie';
import AddIcon from '@mui/icons-material/Add';

const MOCK_GATHERINGS = [
  { id: 1, title: '강남 · 07.15 · 인사이드 아웃 3', movie: '인사이드 아웃 3', place: '롯데시네마 강남', time: '7월 15일 (화) 오후 7:30', current: 3, max: 6, distance: '1.2km' },
  { id: 2, title: '홍대 · 07.16 · 범죄도시 5', movie: '범죄도시 5', place: 'CGV 홍대', time: '7월 16일 (수) 오후 2:00', current: 2, max: 4, distance: '2.5km' },
  { id: 3, title: '신촌 · 07.18 · 퀸 클래식 음악회', movie: '퀸 클래식 음악회', place: '연세대 대강당', time: '7월 18일 (금) 오후 6:00', current: 5, max: 8, distance: '3.8km' },
  { id: 4, title: '종로 · 07.20 · 이상한 나라의 수학자', movie: '이상한 나라의 수학자', place: '인디스페이스', time: '7월 20일 (일) 오후 4:00', current: 1, max: 4, distance: '5.1km' },
  { id: 5, title: '강동 · 07.22 · 라라랜드 재개봉', movie: '라라랜드 (재개봉)', place: 'CGV 강동', time: '7월 22일 (화) 오후 8:00', current: 4, max: 6, distance: '6.3km' },
];

export default function GatheringPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2, bgcolor: '#F5ECD7', minHeight: '100%' }}>
      {/* 상단 헤더 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#795548' }}>📍 서울 강남구 기준</Typography>
          <Chip label="반경 10km" size="small" variant="outlined"
            sx={{ borderColor: '#C4956A', color: '#8B6347', fontSize: 12 }} />
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => navigate('/gathering/create')}
          sx={{ borderRadius: 3, fontWeight: 700, fontSize: 13 }}
        >
          모임 만들기
        </Button>
      </Box>

      {MOCK_GATHERINGS.map((g) => (
        <Card key={g.id} sx={{ mb: 2 }}>
          <CardContent sx={{ pb: '16px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Chip icon={<PeopleIcon sx={{ fontSize: 14 }} />} label={`${g.current}/${g.max}명`}
                size="small" sx={{ bgcolor: '#F5ECD7', color: '#8B6347', fontWeight: 700 }} />
              <Typography variant="caption" color="text.secondary">{g.distance}</Typography>
            </Box>
            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: '#3E2723' }}>
              {g.title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <MovieIcon sx={{ fontSize: 15, color: '#C4956A' }} />
                <Typography variant="body2" color="text.secondary">{g.movie}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <LocationOnIcon sx={{ fontSize: 15, color: '#C4956A' }} />
                <Typography variant="body2" color="text.secondary">{g.place}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <AccessTimeIcon sx={{ fontSize: 15, color: '#C4956A' }} />
                <Typography variant="body2" color="text.secondary">{g.time}</Typography>
              </Box>
            </Box>
            <Button
              variant={g.current >= g.max ? 'outlined' : 'contained'}
              fullWidth size="small"
              disabled={g.current >= g.max}
              onClick={() => alert(`${g.title} 채팅방에 참가합니다!`)}
              sx={{ py: 1 }}
            >
              {g.current >= g.max ? '모집 완료' : '참가하기'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
