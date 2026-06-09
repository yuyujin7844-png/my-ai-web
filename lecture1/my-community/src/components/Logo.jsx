import { Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

export default function Logo({ size = 'large' }) {
  const iconSize = size === 'large' ? 64 : 36;
  const variant = size === 'large' ? 'h4' : 'h6';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <PetsIcon sx={{ fontSize: iconSize, color: 'primary.main' }} />
      <Typography
        variant={variant}
        fontWeight={800}
        color="primary.dark"
        sx={{ letterSpacing: '-0.5px' }}
      >
        멍냥스타그램
      </Typography>
    </Box>
  );
}
