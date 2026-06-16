import { Box, Typography } from '@mui/material';
import { useInView } from '../../hooks/useInView.js';
import { CHAMPAGNE_GOLD } from '../../theme.js';

export default function AnimatedSectionTitle({ overline, title, subtitle, titleSx, sx }) {
  const { ref, inView } = useInView(0.4);

  return (
    <Box ref={ref} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, ...sx }}>
      {overline && (
        <Typography
          variant="overline"
          sx={{
            color: CHAMPAGNE_GOLD,
            letterSpacing: '0.35em',
            fontSize: '0.7rem',
            display: 'block',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          {overline}
        </Typography>
      )}

      {/* 수직 그라데이션 라인: 위→아래로 성장, opacity 100%→30% */}
      <Box
        sx={{
          width: '1px',
          height: inView ? '48px' : '0px',
          background: `linear-gradient(to bottom, ${CHAMPAGNE_GOLD}FF, ${CHAMPAGNE_GOLD}4D)`,
          transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          mx: 'auto',
          my: 1.5,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Playfair Display", "Noto Sans KR", serif',
          color: '#F5F0E8',
          fontSize: { xs: '1.6rem', md: '2.4rem' },
          ...titleSx,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: '#A89B7A',
            letterSpacing: '0.15em',
            mt: 1,
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
