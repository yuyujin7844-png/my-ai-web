import { Box, Typography, Divider } from '@mui/material';
import WineBarIcon from '@mui/icons-material/WineBar';
import GrainIcon from '@mui/icons-material/Grain';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { CHAMPAGNE_GOLD } from '../../theme.js';

const BANNER_IMG = '/images/image/banner.png';

const SPECS = [
  {
    Icon: WineBarIcon,
    label: '도수',
    value: '12.5%',
    unit: 'ABV',
  },
  {
    Icon: GrainIcon,
    label: '포도 품종 비율',
    value: '60/40',
    unit: 'Chardonnay / Pinot',
  },
  {
    Icon: AccessTimeIcon,
    label: '숙성 시간',
    value: '36',
    unit: '개월 이상',
  },
  {
    Icon: ThermostatIcon,
    label: '서빙 온도',
    value: '6–8',
    unit: '°C',
  },
];

export default function ProductDetail() {
  return (
    <Box>
      {/* 상세 소개 섹션 */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          px: { xs: 3, md: 10 },
          background: '#0A1628',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: CHAMPAGNE_GOLD, letterSpacing: '0.35em', fontSize: '0.7rem' }}
        >
          Craftsmanship
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '4rem' },
            fontWeight: 700,
            color: '#F5F0E8',
            lineHeight: 1.2,
            mt: 1,
            mb: { xs: 6, md: 10 },
          }}
        >
          수석 마스터 블렌더의
          <br />
          장인정신
        </Typography>

        {/* 스펙 4열 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 0 },
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          {SPECS.map((spec, i) => (
            <Box key={spec.label}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  px: { xs: 2, md: 4 },
                  py: 3,
                  borderRight: {
                    md: i < SPECS.length - 1 ? `1px solid ${CHAMPAGNE_GOLD}22` : 'none',
                  },
                }}
              >
                <spec.Icon sx={{ color: CHAMPAGNE_GOLD, fontSize: '1.8rem', mb: 2 }} />
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    color: CHAMPAGNE_GOLD,
                    lineHeight: 1,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {spec.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#ffffff66', letterSpacing: '0.1em', mt: 0.5, mb: 1 }}
                >
                  {spec.unit}
                </Typography>
                <Divider
                  sx={{
                    width: 32,
                    borderColor: `${CHAMPAGNE_GOLD}44`,
                    mb: 1.5,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#A89B7A',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.65rem',
                  }}
                >
                  {spec.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 와이드 배너 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 300, sm: 420, md: 560 },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={BANNER_IMG}
          alt="Bloom Champagne banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,22,40,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '1.4rem', sm: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#F5F0E8',
              textAlign: 'center',
              letterSpacing: '0.08em',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              px: 3,
            }}
          >
            오직 당신만을 위한 헌사
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
