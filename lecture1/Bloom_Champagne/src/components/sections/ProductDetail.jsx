import { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import WineBarIcon from '@mui/icons-material/WineBar';
import GrainIcon from '@mui/icons-material/Grain';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { CHAMPAGNE_GOLD, DEEP_NAVY, DARKER_NAVY } from '../../theme.js';
import { useInView } from '../../hooks/useInView.js';
import AnimatedSectionTitle from '../ui/AnimatedSectionTitle.jsx';

const BASE = import.meta.env.BASE_URL;
const BANNER_IMG = `${BASE}images/image/banner.png`;
const BANNER_TEXT = '오직 당신만을 위한 헌사';

const SPECS = [
  {
    Icon: WineBarIcon,
    label: '도수',
    target: 12.5,
    format: (n) => n.toFixed(1),
    suffix: '%',
    unit: 'ABV',
  },
  {
    Icon: GrainIcon,
    label: '포도 품종 비율',
    target: 60,
    format: (n) => Math.floor(n),
    suffix: '/40',
    unit: 'Chardonnay / Pinot',
  },
  {
    Icon: AccessTimeIcon,
    label: '숙성 시간',
    target: 36,
    format: (n) => Math.floor(n),
    suffix: '',
    unit: '개월 이상',
  },
  {
    Icon: ThermostatIcon,
    label: '서빙 온도',
    target: 6,
    format: (n) => Math.floor(n),
    suffix: '–8',
    unit: '°C',
  },
];

// 숫자 카운터 컴포넌트: setInterval로 리듬 제어
function AnimatedCounter({ target, format, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1800;
    const steps = 80;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{format(count)}{suffix}</>;
}

// 배너 텍스트: 글자별 순차 등장 (transform + opacity)
function BannerCharText({ text, inView }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            display: 'inline-block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0px)' : 'translateY(18px)',
            transition: `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </Box>
      ))}
    </>
  );
}

export default function ProductDetail() {
  const { ref: specsRef, inView: specsInView } = useInView(0.3);
  const { ref: bannerRef, inView: bannerInView } = useInView(0.5);

  return (
    <Box>
      {/* 상세 소개 섹션 */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          px: { xs: 3, md: 10 },
          background: DEEP_NAVY,
          textAlign: 'center',
        }}
      >
        <AnimatedSectionTitle
          overline="Craftsmanship"
          title={
            <>
              수석 마스터 블렌더의
              <br />
              장인정신
            </>
          }
          titleSx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '4rem' }, fontWeight: 700 }}
          sx={{ mb: { xs: 6, md: 10 } }}
        />

        {/* 스펙 그리드 (뷰포트 진입 시 카운터 시작) */}
        <Box
          ref={specsRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
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

                {/* 카운터 숫자 */}
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    color: CHAMPAGNE_GOLD,
                    lineHeight: 1,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  <AnimatedCounter
                    target={spec.target}
                    format={spec.format}
                    suffix={spec.suffix}
                    inView={specsInView}
                  />
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff66',
                    letterSpacing: '0.1em',
                    mt: 0.5,
                    mb: 1,
                    fontFamily: '"Noto Sans KR", sans-serif',
                  }}
                >
                  {spec.unit}
                </Typography>
                <Divider sx={{ width: 32, borderColor: `${CHAMPAGNE_GOLD}44`, mb: 1.5 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#A89B7A',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.65rem',
                    fontFamily: '"Noto Sans KR", sans-serif',
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
        ref={bannerRef}
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
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,10,28,0.48)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 글자 순차 등장 효과 */}
          <Typography
            sx={{
              fontFamily: '"Playfair Display", "Noto Sans KR", serif',
              fontSize: { xs: '1.4rem', sm: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#F5F0E8',
              textAlign: 'center',
              letterSpacing: '0.1em',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              px: 3,
            }}
          >
            <BannerCharText text={BANNER_TEXT} inView={bannerInView} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
