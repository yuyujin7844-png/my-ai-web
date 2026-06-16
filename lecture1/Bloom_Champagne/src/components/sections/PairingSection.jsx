import { Box, Typography, Card, CardMedia, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { CHAMPAGNE_GOLD } from '../../theme.js';

const BASE = import.meta.env.BASE_URL;

const PAIRINGS = [
  {
    image: `${BASE}images/image/recommon_01.png`,
    number: '01',
    title: 'OCEAN BREEZE',
    subtitle: 'The Oyster Pairing',
    desc: '붉게 물드는 석양 아래, 도심 속 라운지에서 시작되는 세련된 이브닝 파티.',
  },
  {
    image: `${BASE}images/image/recommon_02.png`,
    number: '02',
    title: 'SUNSET CELEBRATION',
    subtitle: 'Rooftop Hour',
    desc: '신선한 석화, 캐비어 플래터와 함께할 때 극대화되는 청량하고 맑은 스파클링.',
  },
  {
    image: `${BASE}images/image/recommon_03.png`,
    number: '03',
    title: 'INTIMATE MOMENT',
    subtitle: 'Private Dinner',
    desc: '깊어지는 대화 속, 소중한 이와의 밀도 높은 시간을 채우는 우아한 동반자.',
  },
  {
    image: `${BASE}images/image/recommon_04.png`,
    number: '04',
    title: 'THE GRAND GIFT',
    subtitle: 'Curated Gifting',
    desc: '인생의 가장 위대한 성취를 이룬 이에게 찬사를 보내는 럭셔리 기프트 기획.',
  },
];

export default function PairingSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const columns = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        background: '#0A1628',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.6rem', md: '2.4rem' },
            fontWeight: 600,
            color: '#F5F0E8',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          Perfect Pairing
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#A89B7A', letterSpacing: '0.15em' }}
        >
          찬란한 순간을 위한 4가지 제안
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: { xs: 3, md: 3 },
        }}
      >
        {PAIRINGS.map((item) => (
          <Card
            key={item.number}
            sx={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease',
              position: 'relative',
              '&:hover': {
                borderColor: `${CHAMPAGNE_GOLD}55`,
                '& .underline-bar': {
                  width: '100%',
                },
                '& .card-image': {
                  transform: 'scale(1.04)',
                },
              },
            }}
          >
            <Box sx={{ overflow: 'hidden', height: { xs: 240, md: 300 } }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                className="card-image"
                sx={{
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
            </Box>

            <CardContent sx={{ p: { xs: 2.5, md: 3 }, pb: '20px !important' }}>
              <Typography
                variant="caption"
                sx={{
                  color: CHAMPAGNE_GOLD,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  display: 'block',
                  mb: 0.5,
                }}
              >
                {item.number}. {item.title}
              </Typography>

              <Typography
                sx={{
                  color: '#F5F0E8',
                  fontSize: '0.9rem',
                  fontFamily: '"Playfair Display", serif',
                  mb: 1.5,
                }}
              >
                {item.subtitle}
              </Typography>

              {/* 샴페인 골드 언더라인 인터랙션 */}
              <Box
                className="underline-bar"
                sx={{
                  height: '1px',
                  width: '30px',
                  backgroundColor: CHAMPAGNE_GOLD,
                  transition: 'width 0.4s ease',
                  mb: 2,
                }}
              />

              <Typography
                variant="body2"
                sx={{ color: '#A89B7A', lineHeight: 1.7, fontSize: '0.82rem' }}
              >
                {item.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
