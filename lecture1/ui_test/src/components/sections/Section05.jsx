import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
];

const variants = ['outlined', 'filled', 'standard'];

export default function Section05() {
  const [values, setValues] = useState({ outlined: '', filled: '', standard: '' });

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }));
  };

  const getLabel = (value) =>
    frameworks.find((f) => f.value === value)?.label || '(선택 없음)';

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 05 — Dropdown
      </Typography>
      <Divider className="section-divider" />

      <Stack spacing={4} sx={{ mt: 2 }}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              variant="{variant}"
            </Typography>
            <FormControl variant={variant} fullWidth>
              <InputLabel>프레임워크 선택</InputLabel>
              <Select
                value={values[variant]}
                label="프레임워크 선택"
                onChange={handleChange(variant)}
              >
                {frameworks.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              선택된 값: {getLabel(values[variant])}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
