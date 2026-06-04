import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  { id: 1, bg: 'linear-gradient(135deg, #1976d2, #42a5f5)', emoji: '⚛️', title: 'React', sub: '컴포넌트 기반 UI 라이브러리' },
  { id: 2, bg: 'linear-gradient(135deg, #388e3c, #66bb6a)', emoji: '🟢', title: 'Node.js', sub: '서버 사이드 JavaScript 런타임' },
  { id: 3, bg: 'linear-gradient(135deg, #f57c00, #ffa726)', emoji: '⚡', title: 'Vite', sub: '차세대 프론트엔드 빌드 도구' },
  { id: 4, bg: 'linear-gradient(135deg, #7b1fa2, #ba68c8)', emoji: '🎨', title: 'MUI', sub: 'Material Design 컴포넌트 라이브러리' },
  { id: 5, bg: 'linear-gradient(135deg, #c62828, #ef5350)', emoji: '🔷', title: 'TypeScript', sub: '정적 타입을 갖춘 JavaScript' },
];

export default function Section16() {
  const [index, setIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null); // 'left' | 'right' | null

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const handlers = useSwipeable({
    onSwipedLeft: () => { setSwipeDir('left'); next(); },
    onSwipedRight: () => { setSwipeDir('right'); prev(); },
    onSwiping: ({ dir }) => setSwipeDir(dir === 'Left' ? 'left' : dir === 'Right' ? 'right' : null),
    onSwiped: () => setTimeout(() => setSwipeDir(null), 400),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const slide = slides[index];

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 16 — Swipe
      </Typography>
      <Divider className="section-divider" />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        터치 또는 마우스로 좌우 스와이프 하세요. 버튼으로도 이동 가능합니다.
      </Typography>

      <Box sx={{ maxWidth: 500, mx: 'auto' }}>
        {/* 슬라이드 카드 */}
        <Paper
          {...handlers}
          elevation={4}
          sx={{
            background: slide.bg,
            borderRadius: 3,
            height: 240,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            userSelect: 'none',
            color: 'white',
            transition: 'background 0.4s ease',
            outline: swipeDir
              ? `3px solid ${swipeDir === 'left' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.6)'}`
              : 'none',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <Typography fontSize="3.5rem" sx={{ mb: 1 }}>{slide.emoji}</Typography>
          <Typography variant="h5" fontWeight={700}>{slide.title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>{slide.sub}</Typography>

          {/* 스와이프 방향 피드백 */}
          {swipeDir && (
            <Box
              sx={{
                mt: 2,
                px: 2,
                py: 0.5,
                bgcolor: 'rgba(255,255,255,0.25)',
                borderRadius: 10,
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {swipeDir === 'left' ? '← 이전' : '다음 →'}
              </Typography>
            </Box>
          )}
        </Paper>

        {/* 컨트롤 */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          <IconButton onClick={prev} color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          {/* 인디케이터 */}
          <Stack direction="row" spacing={1} alignItems="center">
            {slides.map((s, i) => (
              <Box
                key={s.id}
                onClick={() => setIndex(i)}
                sx={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  borderRadius: 10,
                  bgcolor: i === index ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Stack>

          <IconButton onClick={next} color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
          {index + 1} / {slides.length}
        </Typography>
      </Box>
    </Box>
  );
}
