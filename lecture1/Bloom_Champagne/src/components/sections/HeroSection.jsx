import { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { CHAMPAGNE_GOLD } from '../../theme.js';

const BASE = import.meta.env.BASE_URL;
const VIDEO_SRC = `${BASE}videos/video/sparkling%20video.mp4`;

// 글자별 순차 등장 (아래에서 위로 클립 애니메이션)
function CharLine({ text, ready, baseDelay = 0 }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              transform: ready ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay + i * 0.06}s`,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </Box>
        </Box>
      ))}
    </>
  );
}

export default function HeroSection({ onReserveClick }) {
  const [muted, setMuted] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  const toggleMute = () => {
    setMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  };

  // "[ FRENCH BLOOM LE BLANC ]" = 26자, 마지막 글자 delay = 25 * 0.06 = 1.5s
  const LINE2_DELAY = 1.5;

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

        {/* 움직이는 그라데이션 텍스트 — 한글: 얇은 두께, 시크한 자간 */}
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Noto Sans KR", "Playfair Display", serif',
            fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
            fontWeight: 200,
            letterSpacing: '-0.03em',
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

        {/* "[ FRENCH BLOOM LE BLANC ]" — 글자별 순차 등장 */}
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1rem', md: '1.4rem' },
            fontStyle: 'italic',
            color: CHAMPAGNE_GOLD,
            letterSpacing: '0.05em',
            mb: 0.5,
            lineHeight: 1.4,
          }}
        >
          <CharLine text="[ FRENCH BLOOM LE BLANC ]" ready={heroReady} baseDelay={0} />
        </Typography>

        {/* "을 공개합니다." — 1번 라인 끝난 후 순차 등장 */}
        <Typography
          sx={{
            color: '#ffffff88',
            fontSize: { xs: '0.85rem', md: '1rem' },
            letterSpacing: '0.05em',
            fontFamily: '"Noto Sans KR", sans-serif',
            mb: 0,
            lineHeight: 1.4,
          }}
        >
          <CharLine text="을 공개합니다." ready={heroReady} baseDelay={LINE2_DELAY} />
        </Typography>

        {/* CTA 버튼 */}
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

      {/* 음소거 버튼 */}
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
