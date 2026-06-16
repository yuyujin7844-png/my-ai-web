import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CHAMPAGNE_GOLD } from '../theme.js';

export default function NewPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#0A1628',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontSize: { xs: '1.5rem', md: '2rem' },
          color: '#F5F0E8',
          textAlign: 'center',
        }}
      >
        "추천 상품" 페이지가 개발될 공간입니다.
      </Typography>
      <Typography variant="body2" sx={{ color: '#A89B7A' }}>
        Coming Soon
      </Typography>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{ borderColor: CHAMPAGNE_GOLD, color: CHAMPAGNE_GOLD, mt: 2 }}
      >
        홈으로 돌아가기
      </Button>
    </Box>
  );
}
