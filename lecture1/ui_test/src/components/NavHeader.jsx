import { Box, Typography } from '@mui/material';

const menuItems = ['홈', '소개', '상품', '연락처', '설정'];

export default function NavHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '60px',
        bgcolor: '#2d3748',
        px: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {/* 로고 */}
      <Typography
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          letterSpacing: '0.5px',
          cursor: 'pointer',
        }}
      >
        MyWebsite
      </Typography>

      {/* 메뉴 */}
      <Box sx={{ display: 'flex', gap: '15px' }}>
        {menuItems.map((item) => (
          <Typography
            key={item}
            sx={{
              color: '#a0aec0',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: 'white' },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
