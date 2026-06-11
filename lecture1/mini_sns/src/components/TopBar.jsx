import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function TopBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount } = useNotification();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: 2 }}>
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1, cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography sx={{ fontSize: 26, lineHeight: 1 }}>🍿</Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, letterSpacing: '-0.5px', color: '#5D4037', fontStyle: 'italic' }}
          >
            Moviestagram
          </Typography>
        </Box>
        {user ? (
          <IconButton onClick={() => navigate('/notifications')}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsNoneIcon sx={{ color: '#5D4037' }} />
            </Badge>
          </IconButton>
        ) : (
          <IconButton onClick={() => navigate('/login')}>
            <LoginIcon sx={{ color: '#5D4037' }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
