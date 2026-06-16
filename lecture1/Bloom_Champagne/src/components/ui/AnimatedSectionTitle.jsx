import { Box, Typography } from '@mui/material';
import { useInView } from '../../hooks/useInView.js';
import { CHAMPAGNE_GOLD } from '../../theme.js';

// 문자열 타이틀: 글자별 순차 등장 (아래에서 위로 클립)
function SectionCharTitle({ title, inView }) {
  if (typeof title !== 'string') {
    return (
      <Box sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            transform: inView ? 'translateY(0)' : 'translateY(100%)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s, opacity 0.75s ease 0.1s',
          }}
        >
          {title}
        </Box>
      </Box>
    );
  }

  return (
    <>
      {title.split('').map((char, i) => (
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
              transform: inView ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.04}s`,
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

export default function AnimatedSectionTitle({ overline, title, subtitle, titleSx, sx }) {
  const { ref, inView } = useInView(0.4);

  return (
    <Box ref={ref} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, ...sx }}>
      {overline && (
        <Box sx={{ overflow: 'hidden' }}>
          <Typography
            variant="overline"
            sx={{
              color: CHAMPAGNE_GOLD,
              letterSpacing: '0.35em',
              fontSize: '0.7rem',
              display: 'block',
              fontFamily: '"Noto Sans KR", sans-serif',
              transform: inView ? 'translateY(0)' : 'translateY(110%)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {overline}
          </Typography>
        </Box>
      )}

      {/* 수직 그라데이션 라인: 위→아래로 성장, opacity 100%→50% */}
      <Box
        sx={{
          width: '1px',
          height: inView ? '48px' : '0px',
          background: `linear-gradient(to bottom, ${CHAMPAGNE_GOLD}FF, ${CHAMPAGNE_GOLD}80)`,
          transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
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
        <SectionCharTitle title={title} inView={inView} />
      </Typography>

      {subtitle && (
        <Box sx={{ overflow: 'hidden', mt: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#A89B7A',
              letterSpacing: '0.15em',
              fontFamily: '"Noto Sans KR", sans-serif',
              transform: inView ? 'translateY(0)' : 'translateY(100%)',
              opacity: inView ? 1 : 0,
              transition: 'transform 0.6s ease 0.4s, opacity 0.6s ease 0.4s',
              display: 'block',
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
