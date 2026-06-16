import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const BUBBLES = [
  { id: 0,  left: 8,  size: 8,  duration: 9,  delay: 0,    sway: 20, dir:  1 },
  { id: 1,  left: 20, size: 12, duration: 11, delay: 2.5,  sway: 28, dir: -1 },
  { id: 2,  left: 35, size: 7,  duration: 8,  delay: 5,    sway: 16, dir:  1 },
  { id: 3,  left: 50, size: 16, duration: 14, delay: 1,    sway: 24, dir: -1 },
  { id: 4,  left: 62, size: 9,  duration: 10, delay: 7,    sway: 30, dir:  1 },
  { id: 5,  left: 78, size: 11, duration: 12, delay: 3.5,  sway: 18, dir: -1 },
  { id: 6,  left: 88, size: 6,  duration: 7,  delay: 9,    sway: 22, dir:  1 },
  { id: 7,  left: 15, size: 14, duration: 13, delay: 4.5,  sway: 26, dir: -1 },
  { id: 8,  left: 42, size: 10, duration: 9,  delay: 6,    sway: 20, dir:  1 },
  { id: 9,  left: 70, size: 8,  duration: 11, delay: 11,   sway: 32, dir: -1 },
  { id: 10, left: 25, size: 18, duration: 14, delay: 2,    sway: 14, dir:  1 },
  { id: 11, left: 55, size: 7,  duration: 8,  delay: 8,    sway: 28, dir: -1 },
  { id: 12, left: 82, size: 13, duration: 12, delay: 0.5,  sway: 22, dir:  1 },
  { id: 13, left: 38, size: 9,  duration: 10, delay: 13,   sway: 18, dir: -1 },
  { id: 14, left: 65, size: 15, duration: 13, delay: 5.5,  sway: 25, dir:  1 },
];

const anims = BUBBLES.map(({ sway, dir }) =>
  keyframes({
    '0%':   { transform: 'translateX(0) translateY(0) scale(1)',                                          opacity: 0   },
    '8%':   {                                                                                              opacity: 0.1 },
    '20%':  { transform: `translateX(${dir * sway * 0.4}px) translateY(-180px) scale(1)`,                opacity: 0.7 },
    '40%':  { transform: `translateX(${-dir * sway * 0.6}px) translateY(-380px) scale(1)` },
    '60%':  { transform: `translateX(${dir * sway}px) translateY(-560px) scale(1)` },
    '80%':  { transform: `translateX(${-dir * sway * 0.3}px) translateY(-740px) scale(1)`,               opacity: 0.6 },
    '93%':  { transform: `translateX(${dir * sway * 0.15}px) translateY(-900px) scale(1.4)`,             opacity: 0.3 },
    '100%': { transform: `translateX(0) translateY(-1100px) scale(2.8)`,                                  opacity: 0   },
  })
);

export default function BubbleAnimation() {
  return (
    <Box
      aria-hidden="true"
      sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}
    >
      {BUBBLES.map((b, i) => (
        <Box
          key={b.id}
          sx={{
            position: 'absolute',
            bottom: -30,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, rgba(255,235,130,0.45) 0%, rgba(212,175,55,0.18) 40%, rgba(180,140,40,0.06) 68%, transparent 100%)`,
            border: '1px solid rgba(212,175,55,0.22)',
            boxShadow: `0 0 ${Math.ceil(b.size * 0.5)}px rgba(212,175,55,0.10), inset 0 0 ${Math.ceil(b.size * 0.25)}px rgba(255,235,130,0.08)`,
            animation: `${anims[i]} ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        />
      ))}
    </Box>
  );
}
