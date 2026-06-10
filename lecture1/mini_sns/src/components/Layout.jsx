import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5ECD7', maxWidth: 480, mx: 'auto' }}>
      <TopBar />
      <Box sx={{ flex: 1, overflowY: 'auto', pb: '64px' }}>
        <Outlet />
      </Box>
      <BottomNav />
    </Box>
  );
}
