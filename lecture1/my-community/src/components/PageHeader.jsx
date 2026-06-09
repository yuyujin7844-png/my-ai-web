import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

export default function PageHeader({ left, right }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'sticky', top: 0, zIndex: 100,
        bgcolor: 'rgba(255,248,225,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2, py: 1,
        minHeight: 56,
      }}
    >
      {/* 왼쪽 */}
      <Box sx={{ minWidth: 44, display: 'flex', alignItems: 'center' }}>
        {left}
      </Box>

      {/* 가운데: 로고 */}
      <Box
        onClick={() => navigate('/main')}
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
      >
        <PetsIcon sx={{ color: 'primary.main', fontSize: 26 }} />
        <Typography variant="subtitle1" fontWeight={800} color="primary.dark">
          멍냥스타그램
        </Typography>
      </Box>

      {/* 오른쪽 */}
      <Box sx={{ minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {right}
      </Box>
    </Box>
  );
}
