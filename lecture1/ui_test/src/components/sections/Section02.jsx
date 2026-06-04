import { Box, Typography, Divider, Button, Stack } from '@mui/material';

const variants = ['contained', 'outlined', 'text'];
const colors = ['primary', 'secondary', 'error'];

export default function Section02() {
  const handleClick = (variant, color) => {
    alert(`클릭! variant: ${variant} / color: ${color}`);
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 02 — Button
      </Typography>
      <Divider className="section-divider" />

      {variants.map((variant) => (
        <Box key={variant} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            variant="{variant}"
          </Typography>
          <Stack direction="row" spacing={2}>
            {colors.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {color}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
