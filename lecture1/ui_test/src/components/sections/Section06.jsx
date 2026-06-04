import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';

const options = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
];

export default function Section06() {
  const [checked, setChecked] = useState([]);

  const isAllChecked = checked.length === options.length;
  const isIndeterminate = checked.length > 0 && checked.length < options.length;

  const handleAll = () => {
    setChecked(isAllChecked ? [] : options.map((o) => o.value));
  };

  const handleItem = (value) => {
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 06 — Checkbox
      </Typography>
      <Divider className="section-divider" />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
        <FormControlLabel
          label={<Typography fontWeight={600}>전체 선택</Typography>}
          control={
            <Checkbox
              checked={isAllChecked}
              indeterminate={isIndeterminate}
              onChange={handleAll}
              color="primary"
            />
          }
        />
        <Typography variant="body2" color="text.secondary">
          선택된 항목: <strong>{checked.length}</strong> / {options.length}개
        </Typography>
      </Stack>

      <Divider sx={{ mb: 1 }} />

      <FormGroup sx={{ pl: 2 }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            control={
              <Checkbox
                checked={checked.includes(option.value)}
                onChange={() => handleItem(option.value)}
                color="primary"
              />
            }
          />
        ))}
      </FormGroup>

      {checked.length > 0 && (
        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            선택됨: {checked.map((v) => options.find((o) => o.value === v)?.label).join(', ')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
