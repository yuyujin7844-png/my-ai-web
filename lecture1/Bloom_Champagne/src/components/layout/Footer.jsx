import { Box, Typography, Link, Divider, IconButton, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CHAMPAGNE_GOLD } from '../../theme.js';

const SOCIAL = [
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: YouTubeIcon,   label: 'YouTube'   },
  { Icon: FacebookIcon,  label: 'Facebook'  },
  { Icon: TwitterIcon,   label: 'Twitter'   },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: '#09090b',
        borderTop: `1px solid ${CHAMPAGNE_GOLD}22`,
        pt: { xs: 6, md: 8 },
        pb: 4,
        px: { xs: 3, md: 8 },
      }}
    >
      {/* 로고 + 링크 (로고 아래 배치) */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
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
            mb: 2.5,
          }}
        >
          Champagne
        </Typography>

        <Stack direction="row" spacing={4} sx={{ justifyContent: 'center' }}>
          {['매장찾기', '문의하기'].map((label) => (
            <Link
              key={label}
              href="#"
              underline="none"
              sx={{
                color: '#ffffff66',
                fontSize: '0.78rem',
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

      {/* 법적 경고 — 푸터보다 살짝 밝은 차콜 */}
      <Box
        sx={{
          background: '#111113',
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

      {/* 카피라이트 가운데 정렬 + 소셜 아이콘 아래 배치 */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="caption"
          sx={{ color: '#ffffff33', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
        >
          © 2024 Bloom Champagne. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
          {SOCIAL.map(({ Icon, label }) => (
            <IconButton
              key={label}
              href="#"
              aria-label={label}
              sx={{ color: '#ffffff44', '&:hover': { color: CHAMPAGNE_GOLD } }}
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
