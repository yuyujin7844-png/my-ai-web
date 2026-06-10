import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const NAV_ITEMS = [
  { label: '홈', value: '/', active: <HomeIcon />, inactive: <HomeOutlinedIcon /> },
  { label: '모임', value: '/gathering', active: <GroupsIcon />, inactive: <GroupsOutlinedIcon /> },
  { label: '', value: '/create',
    active: <AddCircleIcon sx={{ fontSize: 38, color: '#8B6347' }} />,
    inactive: <AddCircleIcon sx={{ fontSize: 38, color: '#C4956A' }} />,
  },
  { label: '채팅', value: '/chat', active: <ChatIcon />, inactive: <ChatOutlinedIcon /> },
  { label: '마이', value: '/mypage', active: <PersonIcon />, inactive: <PersonOutlinedIcon /> },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = '/' + (location.pathname.split('/')[1] || '');

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed', bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        zIndex: 1100,
      }}
    >
      <BottomNavigation value={current} sx={{ bgcolor: '#FFF9F0', height: 64, borderTop: '1px solid #E8D5B7' }}>
        {NAV_ITEMS.map(({ label, value, active, inactive }) => (
          <BottomNavigationAction
            key={value}
            label={label}
            value={value}
            icon={current === value ? active : inactive}
            onClick={() => navigate(value)}
            sx={{ minWidth: 0, px: 0 }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
