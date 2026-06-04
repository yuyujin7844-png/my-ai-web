import { Box, Typography, Divider, Grid } from '@mui/material';

const hoverCards = [
  {
    key: 'color',
    title: '색상 변화',
    desc: '배경색이 부드럽게 전환됩니다',
    emoji: '🎨',
    baseSx: {
      bgcolor: 'grey.100',
      color: 'text.primary',
    },
    hoverSx: {
      bgcolor: 'primary.main',
      color: 'white',
    },
  },
  {
    key: 'scale',
    title: '크기 변화',
    desc: '카드가 살짝 커집니다',
    emoji: '🔍',
    baseSx: { bgcolor: 'grey.100' },
    hoverSx: { transform: 'scale(1.06)' },
  },
  {
    key: 'shadow',
    title: '그림자 효과',
    desc: '깊은 그림자가 생겨납니다',
    emoji: '🌑',
    baseSx: { bgcolor: 'white', boxShadow: 1 },
    hoverSx: { boxShadow: 10 },
  },
  {
    key: 'rotate',
    title: '기울기 효과',
    desc: '카드가 살짝 기울어집니다',
    emoji: '🔄',
    baseSx: { bgcolor: 'grey.100' },
    hoverSx: { transform: 'rotate(-4deg) scale(1.03)' },
  },
  {
    key: 'glow',
    title: '글로우 효과',
    desc: '컬러 빛이 번져나옵니다',
    emoji: '✨',
    baseSx: { bgcolor: '#1a1a2e', color: 'white' },
    hoverSx: {
      boxShadow: '0 0 20px 6px rgba(99, 102, 241, 0.6)',
      bgcolor: '#16213e',
    },
  },
  {
    key: 'lift',
    title: '떠오르기',
    desc: '위로 살짝 떠오르는 효과',
    emoji: '🚀',
    baseSx: {
      bgcolor: 'secondary.light',
      color: 'secondary.contrastText',
      boxShadow: 2,
    },
    hoverSx: {
      transform: 'translateY(-8px)',
      boxShadow: 8,
    },
  },
  {
    key: 'border',
    title: '테두리 강조',
    desc: '굵은 컬러 테두리가 나타납니다',
    emoji: '🔲',
    baseSx: {
      bgcolor: 'white',
      border: '2px solid transparent',
      boxShadow: 1,
    },
    hoverSx: {
      border: '2px solid',
      borderColor: 'error.main',
      bgcolor: 'error.50',
    },
  },
  {
    key: 'invert',
    title: '색상 반전',
    desc: '전경색과 배경색이 뒤바뀝니다',
    emoji: '🔀',
    baseSx: {
      bgcolor: 'white',
      color: 'primary.main',
      border: '2px solid',
      borderColor: 'primary.main',
    },
    hoverSx: {
      bgcolor: 'primary.main',
      color: 'white',
    },
  },
];

export default function Section15() {
  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 15 — Hover
      </Typography>
      <Divider className="section-divider" />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        각 카드에 마우스를 올려보세요.
      </Typography>

      <Grid container spacing={2}>
        {hoverCards.map(({ key, title, desc, emoji, baseSx, hoverSx }) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.25s ease',
                ...baseSx,
                '&:hover': hoverSx,
              }}
            >
              <Typography fontSize="2rem" sx={{ mb: 1 }}>
                {emoji}
              </Typography>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                {title}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                {desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
