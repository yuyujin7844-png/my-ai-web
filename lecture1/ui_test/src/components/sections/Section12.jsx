import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  Grid,
  Fade,
  Grow,
  Slide,
} from '@mui/material';

const cssAnims = [
  {
    key: 'bounce',
    label: '바운스',
    color: '#1976d2',
    emoji: '⬆',
    keyframes: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
    `,
    sx: { animation: 'bounce 0.6s ease infinite' },
  },
  {
    key: 'spin',
    label: '스핀',
    color: '#9c27b0',
    emoji: '↻',
    keyframes: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
    sx: { animation: 'spin 0.8s linear infinite' },
  },
  {
    key: 'pulse',
    label: '펄스',
    color: '#d32f2f',
    emoji: '♥',
    keyframes: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
      }
    `,
    sx: { animation: 'pulse 0.6s ease infinite' },
  },
];

function TransitionCard({ title, color, children, onToggle, active }) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          mb: 1,
          bgcolor: 'grey.50',
        }}
      >
        {children}
      </Paper>
      <Button
        variant={active ? 'contained' : 'outlined'}
        size="small"
        fullWidth
        onClick={onToggle}
        sx={{ bgcolor: active ? color : undefined, '&:hover': { bgcolor: active ? color : undefined } }}
      >
        {active ? '숨기기' : '재생'}
      </Button>
    </Box>
  );
}

function CssAnimCard({ item, active, onToggle }) {
  return (
    <Box>
      <style>{item.keyframes}</style>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        {item.label}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          bgcolor: 'grey.50',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: item.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.4rem',
            ...(active ? item.sx : {}),
          }}
        >
          {item.emoji}
        </Box>
      </Paper>
      <Button
        variant={active ? 'contained' : 'outlined'}
        size="small"
        fullWidth
        onClick={onToggle}
      >
        {active ? '정지' : '재생'}
      </Button>
    </Box>
  );
}

export default function Section12() {
  const [fade, setFade] = useState(false);
  const [grow, setGrow] = useState(false);
  const [slide, setSlide] = useState(false);
  const [cssActive, setCssActive] = useState({ bounce: false, spin: false, pulse: false });

  const toggleCss = (key) =>
    setCssActive((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 12 — Animation
      </Typography>
      <Divider className="section-divider" />

      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        MUI 트랜지션 (Fade · Grow · Slide)
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TransitionCard title="Fade" color="#1976d2" active={fade} onToggle={() => setFade((v) => !v)}>
            <Fade in={fade} timeout={600}>
              <Paper elevation={4} sx={{ px: 3, py: 1.5, bgcolor: '#1976d2', color: 'white' }}>
                <Typography fontWeight={600}>Fade In</Typography>
              </Paper>
            </Fade>
          </TransitionCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <TransitionCard title="Grow" color="#388e3c" active={grow} onToggle={() => setGrow((v) => !v)}>
            <Grow in={grow} timeout={500}>
              <Paper elevation={4} sx={{ px: 3, py: 1.5, bgcolor: '#388e3c', color: 'white' }}>
                <Typography fontWeight={600}>Grow In</Typography>
              </Paper>
            </Grow>
          </TransitionCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <TransitionCard title="Slide (left → right)" color="#f57c00" active={slide} onToggle={() => setSlide((v) => !v)}>
            <Slide in={slide} direction="right" timeout={400}>
              <Paper elevation={4} sx={{ px: 3, py: 1.5, bgcolor: '#f57c00', color: 'white' }}>
                <Typography fontWeight={600}>Slide In</Typography>
              </Paper>
            </Slide>
          </TransitionCard>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
        CSS 키프레임 애니메이션 (Bounce · Spin · Pulse)
      </Typography>

      <Grid container spacing={3}>
        {cssAnims.map((item) => (
          <Grid key={item.key} size={{ xs: 12, sm: 4 }}>
            <CssAnimCard
              item={item}
              active={cssActive[item.key]}
              onToggle={() => toggleCss(item.key)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
