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
            'linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.85) 100%)',
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
          }}
        >
          Bloom Champagne Presents
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
            fontWeight: 700,
            color: '#F5F0E8',
            lineHeight: 1.2,
            mb: 2,
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
            mb: { xs: 4, md: 6 },
          }}
        >
          을 공개합니다.
        </Typography>

        {/* CTA 버튼 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 },
            justifyContent: 'center',
            alignItems: 'center',
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
              color: '#0A1628',
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

      {/* 음소거 토글 버튼 */}
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
          '&:hover': { border: `1px solid ${CHAMPAGNE_GOLD}`, color: CHAMPAGNE_GOLD },
        }}
      >
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
    </Box>
  );
}
