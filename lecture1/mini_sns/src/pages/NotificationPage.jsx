import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import {
  Box, Typography, IconButton, Avatar, Card, CardContent, AppBar, Toolbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ICON_MAP = {
  like: { icon: <FavoriteIcon sx={{ fontSize: 20 }} />, bg: '#FF6B6B', color: 'white' },
  comment: { icon: <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />, bg: '#4A90D9', color: 'white' },
  follow: { icon: <PersonAddIcon sx={{ fontSize: 20 }} />, bg: '#5CB85C', color: 'white' },
  gathering: { icon: <GroupsIcon sx={{ fontSize: 20 }} />, bg: '#C4956A', color: 'white' },
};

export default function NotificationPage() {
  const navigate = useNavigate();
  const { notifications, markRead } = useNotification();

  return (
    <Box sx={{ bgcolor: '#F5ECD7', minHeight: '100vh', maxWidth: 480, mx: 'auto' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="subtitle1" fontWeight={700}>알림</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 1.5 }}>
        {notifications.length === 0 ? (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 48, color: '#C4956A', mb: 1 }} />
            <Typography color="text.secondary">알림이 없습니다</Typography>
          </Box>
        ) : (
          notifications.map((noti) => {
            const iconConfig = ICON_MAP[noti.type] || ICON_MAP.like;
            return (
              <Card
                key={noti.id}
                onClick={() => markRead(noti.id)}
                sx={{
                  mb: 1.5, cursor: 'pointer', position: 'relative',
                  bgcolor: noti.read ? '#FFF9F0' : '#FFFAF3',
                  boxShadow: noti.read ? '0 1px 3px rgba(0,0,0,0.06)' : '0 2px 8px rgba(139,99,71,0.15)',
                  '&:hover': { boxShadow: '0 3px 10px rgba(139,99,71,0.2)' },
                  transition: 'box-shadow 0.2s',
                }}
              >
                {/* 읽지 않은 알림 표시 */}
                {!noti.read && (
                  <Box sx={{
                    position: 'absolute', top: 10, right: 10,
                    width: 10, height: 10, borderRadius: '50%', bgcolor: '#F44336',
                  }} />
                )}
                <CardContent sx={{ pb: '12px !important', pt: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* 왼쪽 동그란 아이콘 */}
                    <Avatar sx={{ width: 44, height: 44, bgcolor: iconConfig.bg, flexShrink: 0 }}>
                      {iconConfig.icon}
                    </Avatar>
                    {/* 텍스트 3행 */}
                    <Box sx={{ flex: 1, minWidth: 0, pr: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#3E2723', lineHeight: 1.3 }}>
                        {noti.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary"
                        sx={{ mt: 0.2, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {noti.desc}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#B09878', mt: 0.3, display: 'block' }}>
                        {noti.date}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
}
