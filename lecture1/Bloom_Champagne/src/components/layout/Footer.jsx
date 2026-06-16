import { Box, Typography, Link, Divider, IconButton, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { CHAMPAGNE_GOLD, MIDNIGHT_NAVY } from '../../theme.js';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: '#060E1A',
        borderTop: `1px solid ${CHAMPAGNE_GOLD}22`,
        pt: { xs: 6, md: 8 },
        pb: 4,
        px: { xs: 3, md: 8 },
      }}
    >
      {/* 상단: 로고 + 퀵링크 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 4,
          mb: 5,
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: CHAMPAGNE_GOLD,
              textTransform: 'uppercase',
            }}
          >
            Bloom
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.75rem',
              letterSpacing: '0.4em',
              color: '#ffffff55',
              textTransform: 'uppercase',
            }}
          >
            Champagne
          </Typography>
        </Box>

        <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
          {['매장찾기', '문의하기'].map((label) => (
            <Link
              key={label}
              href="#"
              underline="none"
              sx={{
                color: '#ffffff88',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                '&:hover': { color: CHAMPAGNE_GOLD },
              }}
            >
              {label}
            </Link>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ borderColor: `${CHAMPAGNE_GOLD}15`, mb: 4 }} />

      {/* 중간: 법적 경고 */}
      <Box
        sx={{
          background: '#0D1B2E',
          border: `1px solid ${CHAMPAGNE_GOLD}22`,
          borderRadius: 1,
          p: 3,
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: '#ffffff44', lineHeight: 1.8, display: 'block', maxWidth: 700, mx: 'auto' }}
        >
          ⚠️ 주류 광고 법적 경고문: 이 광고는 만 19세 미만인 자에게 음주를 권장하거나 유도하지 않습니다.
          음주는 건강에 해롭습니다. 임신 중 음주는 태아의 건강을 위협합니다.
          음주운전은 범죄입니다. 과음·폭음은 건강에 해롭습니다. ｜ 국민건강증진법 제7조
        </Typography>
      </Box>

      {/* 하단: 카피라이트 + 소셜 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="caption" sx={{ color: '#ffffff33', letterSpacing: '0.1em' }}>
          © 2024 Bloom Champagne. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            href="#"
            aria-label="Instagram"
            sx={{ color: '#ffffff44', '&:hover': { color: CHAMPAGNE_GOLD } }}
          >
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton
            href="#"
            aria-label="YouTube"
            sx={{ color: '#ffffff44', '&:hover': { color: CHAMPAGNE_GOLD } }}
          >
            <YouTubeIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
