import { useState, useRef } from 'react';
import { Box, Button, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { CHAMPAGNE_GOLD } from '../../theme.js';

const BASE = import.meta.env.BASE_URL;
const VIDEO_SRC = `${BASE}videos/video/sparkling%20video.mp4`;

export default function HeroSection({ onReserveClick }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleMute = () => {
    setMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 배경 비디오 */}
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src={VIDEO_SRC}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* 오버레이 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(5,10,28,0.3) 0%, rgba(5,10,28,0.5) 50%, rgba(5,10,28,0.88) 100%)',
          zIndex: 1,
        }}
      />

      {/* 콘텐츠 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          px: { xs: 3, md: 6 },
          maxWidth: 900,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: CHAMPAGNE_GOLD,
            letterSpacing: '0.4em',
            fontSize: { xs: '0.65rem', md: '0.75rem' },
            display: 'block',
            mb: 2,
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          Bloom Champagne Presents
        </Typography>

        {/* 움직이는 그라데이션 텍스트 */}
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", "Noto Sans KR", serif',
            fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 2,
            background:
              'linear-gradient(135deg, #D4AF37 0%, #F5E8C0 25%, #ffffff 40%, #D4AF37 60%, #B8923B 80%, #D4AF37 100%)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 5s ease infinite',
            '@keyframes gradientShift': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
          }}
        >
          가장 완벽한 순간에
          <br />
          열리는 빛
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1rem', md: '1.4rem' },
            fontStyle: 'italic',
            color: CHAMPAGNE_GOLD,
            letterSpacing: '0.05em',
            mb: 1,
          }}
        >
          [ FRENCH BLOOM LE BLANC ]
        </Typography>

        <Typography
          sx={{
            color: '#ffffff88',
            fontSize: { xs: '0.85rem', md: '1rem' },
            letterSpacing: '0.05em',
            fontFamily: '"Noto Sans KR", sans-serif',
            mb: 0,
          }}
        >
          을 공개합니다.
        </Typography>

        {/* CTA 버튼: 아래로 더 이동 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 },
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 6, md: 10 },
          }}
        >
          <Button
            variant="outlined"
            href="#features"
            sx={{
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 280, sm: 'none' },
              borderColor: '#ffffff',
              color: '#ffffff',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              '&:hover': { borderColor: CHAMPAGNE_GOLD, color: CHAMPAGNE_GOLD },
            }}
          >
            신제품 보러가기
          </Button>

          <Button
            variant="contained"
            onClick={onReserveClick}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 280, sm: 'none' },
              backgroundColor: CHAMPAGNE_GOLD,
              color: '#050A1C',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#C4A030' },
            }}
          >
            사전 예약하기
          </Button>
        </Box>
      </Box>

      {/* 음소거 버튼: opacity 50% */}
      <IconButton
        onClick={toggleMute}
        aria-label={muted ? '소리 켜기' : '음소거'}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          right: { xs: 20, md: 40 },
          zIndex: 3,
          color: '#ffffff',
          border: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(4px)',
          background: 'rgba(255,255,255,0.08)',
          minWidth: 48,
          minHeight: 48,
          opacity: 0.5,
          transition: 'opacity 0.3s ease, border-color 0.3s ease, color 0.3s ease',
          '&:hover': {
            opacity: 1,
            border: `1px solid ${CHAMPAGNE_GOLD}`,
            color: CHAMPAGNE_GOLD,
          },
        }}
      >
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
    </Box>
  );
}
