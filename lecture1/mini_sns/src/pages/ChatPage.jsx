import { useNavigate } from 'react-router-dom';
import {
  Box, List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Typography, Divider, Chip,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

const MOCK_CHATS = [
  { id: 'g1', name: '인사이드 아웃 3 강남 모임', isGroup: true, members: 3, lastMsg: '내일 7시에 CGV 앞에서 만나요!', time: '10분 전', unread: 2 },
  { id: 'g2', name: '범죄도시 5 홍대 모임', isGroup: true, members: 2, lastMsg: '예매 완료했어요 🎉', time: '1시간 전', unread: 0 },
  { id: 'g3', name: '퀸 클래식 음악회 신촌', isGroup: true, members: 5, lastMsg: '드레스코드 있나요?', time: '3시간 전', unread: 1 },
  { id: 'd1', name: '시네필', isGroup: false, members: 1, lastMsg: '그 영화 재미있었어요?', time: '어제', unread: 1 },
  { id: 'd2', name: '영화왕', isGroup: false, members: 1, lastMsg: '같이 보러 가요!', time: '2일 전', unread: 0 },
];

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#F5ECD7', minHeight: '100%' }}>
      <List sx={{ p: 0, bgcolor: '#FFF9F0' }}>
        {MOCK_CHATS.map((chat, idx) => (
          <Box key={chat.id}>
            <ListItem
              sx={{ px: 2, py: 1.5, cursor: 'pointer', '&:hover': { bgcolor: '#FFF3E0' } }}
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: chat.isGroup ? '#C4956A' : '#D4A76A', width: 50, height: 50 }}>
                  {chat.isGroup ? <GroupsIcon /> : <PersonIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Typography variant="body1" fontWeight={700}>{chat.name}</Typography>
                      {chat.isGroup && (
                        <Typography variant="caption" color="text.secondary">{chat.members}</Typography>
                      )}
                    </Box>
                    <Typography variant="caption" color="text.disabled">{chat.time}</Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.3 }}>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>
                      {chat.lastMsg}
                    </Typography>
                    {chat.unread > 0 && (
                      <Chip
                        label={chat.unread}
                        size="small"
                        sx={{ bgcolor: '#8B6347', color: 'white', height: 20, minWidth: 20, fontSize: 11, ml: 1 }}
                      />
                    )}
                  </Box>
                }
              />
            </ListItem>
            {idx < MOCK_CHATS.length - 1 && <Divider sx={{ borderColor: '#F5ECD7', ml: 9 }} />}
          </Box>
        ))}
      </List>
    </Box>
  );
}
