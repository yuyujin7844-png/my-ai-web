import { Box, Typography, Divider } from '@mui/material';

const menuItems = ['홈', '소개', '상품', '연락처', '설정'];

export default function Section18() {
  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 18 — Flex Navigation
      </Typography>
      <Divider className="section-divider" />

      {/* 네비게이션 바 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '60px',
          bgcolor: '#2d3748',
          px: 3,
          borderRadius: 1,
          mt: 2,
        }}
      >
        {/* 로고 박스 */}
        <Box>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            MyWebsite
          </Typography>
        </Box>

        {/* 메뉴 박스 */}
        <Box
          sx={{
            display: 'flex',
            gap: '15px',
          }}
        >
          {menuItems.map((item) => (
            <Typography
              key={item}
              sx={{
                color: '#a0aec0',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
