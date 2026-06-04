import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Slider,
  Stack,
} from '@mui/material';

const marks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

const sliders = [
  { label: '기본 슬라이더', key: 'basic', color: 'primary' },
  { label: '색상: secondary', key: 'secondary', color: 'secondary' },
  { label: '색상: error', key: 'error', color: 'error' },
];

export default function Section08() {
  const [values, setValues] = useState({ basic: 30, secondary: 55, error: 75 });

  const handleChange = (key) => (_, newValue) => {
    setValues((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 08 — Slider
      </Typography>
      <Divider className="section-divider" />

      <Stack spacing={5} sx={{ mt: 3 }}>
        {sliders.map(({ label, key, color }) => (
          <Box key={key}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {label}
              </Typography>
              <Typography
                variant="h6"
                color={`${color}.main`}
                sx={{ minWidth: 48, textAlign: 'right' }}
              >
                {values[key]}
              </Typography>
            </Stack>
            <Slider
              value={values[key]}
              onChange={handleChange(key)}
              min={0}
              max={100}
              marks={marks}
              color={color}
              valueLabelDisplay="auto"
              sx={{ mx: 1 }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
