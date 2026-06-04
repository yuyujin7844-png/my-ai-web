import { Box, Typography, Divider, TextField, Stack } from '@mui/material';
import { useState } from 'react';

const variants = ['standard', 'outlined', 'filled'];

export default function Section03() {
  const [values, setValues] = useState({ standard: '', outlined: '', filled: '' });

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }));
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 03 — Input
      </Typography>
      <Divider className="section-divider" />

      <Stack spacing={4}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              variant="{variant}"
            </Typography>
            <TextField
              variant={variant}
              label={`${variant} 입력`}
              placeholder={`${variant} 텍스트를 입력하세요`}
              value={values[variant]}
              onChange={handleChange(variant)}
              fullWidth
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              입력값: {values[variant] || '(없음)'}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
