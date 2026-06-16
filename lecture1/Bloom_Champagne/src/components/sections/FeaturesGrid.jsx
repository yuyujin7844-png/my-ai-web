import { Box, Typography, Card, CardMedia, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { CHAMPAGNE_GOLD } from '../../theme.js';

const BASE = import.meta.env.BASE_URL;

const CARDS = [
  {
    image: `${BASE}images/image/main%20image_01.png`,
    title: 'The Grand Cru',
    desc: '프랑스 최고급 공인 등급 포도밭에서 엄선한 최상급 원료만을 고집합니다',
  },
  {
    image: `${BASE}images/image/main%20image_02.png`,
    title: 'Time-Honored Aging',
    desc: '지하 동굴에서 수년간 진행된 자연 숙성이 자아내는 깊은 기품의 맛',
  },
  {
    image: `${BASE}images/image/main%20image_03.png`,
    title: 'Aromatic Symphony',
    desc: '완벽한 탄산감을 위해 정밀하게 설계된 끊임없는 황금빛 기포의 향연',
  },
  {
    image: `${BASE}images/image/main%20image_04.jpg`,
    title: 'Golden Effervescence',
    desc: '섬세하고 끊임없이 올라오는 황금빛 기포의 청량감',
  },
  {
    image: `${BASE}images/image/main%20image_05.png`,
    title: 'Aesthetic Vessel',
    desc: '소장 가치를 더하는 모던하고 미니멀한 독창적 보틀 실루엣',
  },
  {
    image: `${BASE}images/image/main%20image_06.png`,
    title: 'The Perfect Pour',
    desc: '소중한 이들과의 프라이빗한 저녁, 축제의 순간을 빛낼 최고의 마리아주.',
  },
];

export default function FeaturesGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        background: '#060E1A',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="overline"
          sx={{ color: CHAMPAGNE_GOLD, letterSpacing: '0.35em', fontSize: '0.7rem' }}
        >
          Our Distinction
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            color: '#F5F0E8',
            mt: 1,
            fontSize: { xs: '1.6rem', md: '2.4rem' },
          }}
        >
          비교할 수 없는 6가지 특별함
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: { xs: 3, md: 4 },
        }}
      >
        {CARDS.map((card) => (
          <Card
            key={card.title}
            sx={{
              background: '#0A1628',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              transform: 'translateY(0)',
              '&:hover': {
                border: `1px solid ${CHAMPAGNE_GOLD}`,
                transform: 'translateY(-8px)',
                boxShadow: `0 20px 60px rgba(212,175,55,0.15)`,
                '& .card-image': {
                  transform: 'scale(1.08)',
                },
              },
            }}
          >
            <Box sx={{ overflow: 'hidden', height: { xs: 220, md: 280 } }}>
              <CardMedia
                component="img"
                image={card.image}
                alt={card.title}
                className="card-image"
                sx={{
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
            </Box>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  color: CHAMPAGNE_GOLD,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                sx={{
                  color: '#A89B7A',
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                }}
              >
                {card.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
