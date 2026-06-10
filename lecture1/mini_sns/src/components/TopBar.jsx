import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function TopBar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1 }}>
          <Typography sx={{ fontSize: 26, lineHeight: 1, userSelect: 'none' }}>🍿</Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, letterSpacing: '-0.5px', color: '#5D4037', fontStyle: 'italic' }}
          >
            Moviestagram
          </Typography>
        </Box>
        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon sx={{ color: '#5D4037' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
