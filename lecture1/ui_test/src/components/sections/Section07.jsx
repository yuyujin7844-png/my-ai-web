import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
} from '@mui/material';

const groups = [
  {
    label: '개발 직군',
    name: 'job',
    options: [
      { value: 'frontend', label: '프론트엔드' },
      { value: 'backend', label: '백엔드' },
      { value: 'fullstack', label: '풀스택' },
      { value: 'devops', label: 'DevOps' },
    ],
  },
  {
    label: '경력 수준',
    name: 'level',
    options: [
      { value: 'junior', label: '주니어 (0~2년)' },
      { value: 'middle', label: '미들 (3~5년)' },
      { value: 'senior', label: '시니어 (6년 이상)' },
    ],
  },
];

export default function Section07() {
  const [values, setValues] = useState({ job: '', level: '' });

  const handleChange = (name) => (e) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const getLabel = (name, value) => {
    const group = groups.find((g) => g.name === name);
    return group?.options.find((o) => o.value === value)?.label || '(선택 없음)';
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 07 — Radio
      </Typography>
      <Divider className="section-divider" />

      <Stack spacing={4} sx={{ mt: 2 }}>
        {groups.map((group) => (
          <Box key={group.name}>
            <FormControl>
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>{group.label}</FormLabel>
              <RadioGroup
                value={values[group.name]}
                onChange={handleChange(group.name)}
              >
                {group.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    control={<Radio color="primary" />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              선택된 값: {getLabel(group.name, values[group.name])}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
