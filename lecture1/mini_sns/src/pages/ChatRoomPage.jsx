import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  TextField, Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const INIT_MESSAGES = [
  { id: 1, sender: '시네필', isMine: false, text: '안녕하세요! 모임 참가 신청합니다 😊', time: '오후 2:30' },
  { id: 2, sender: 'me', isMine: true, text: '반갑습니다! 내일 7시에 CGV 앞에서 만나요', time: '오후 2:31' },
  { id: 3, sender: '팝콘러버', isMine: false, text: '저도 참가할게요! 팝콘 제가 살게요 🍿', time: '오후 2:35' },
  { id: 4, sender: 'me', isMine: true, text: '좋아요! 다들 기대됩니다 🎬', time: '오후 2:36' },
];

const CHAT_NAMES = {
  g1: '인사이드 아웃 3 강남 모임',
  g2: '범죄도시 5 홍대 모임',
  g3: '퀸 클래식 음악회 신촌',
  d1: '시네필',
  d2: '영화왕',
};

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'me', isMine: true, text: input.trim(), time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}` },
    ]);
    setInput('');
  };

  const chatName = CHAT_NAMES[id] || '채팅방';
  const isGroup = id?.startsWith('g');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5ECD7', display: 'flex', flexDirection: 'column', maxWidth: 480, mx: 'auto' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2 }}>{chatName}</Typography>
            {isGroup && <Typography variant="caption" color="text.secondary">그룹 채팅</Typography>}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pb: 1 }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              flexDirection: msg.isMine ? 'row-reverse' : 'row',
              alignItems: 'flex-end', mb: 1.5, gap: 1,
            }}
          >
            {!msg.isMine && (
              <Avatar sx={{ width: 34, height: 34, bgcolor: '#C4956A', fontSize: 14, flexShrink: 0 }}>
                {msg.sender[0]}
              </Avatar>
            )}
            <Box>
              {!msg.isMine && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.3, ml: 0.5 }}>
                  {msg.sender}
                </Typography>
              )}
              <Box
                sx={{
                  bgcolor: msg.isMine ? '#8B6347' : '#FFF9F0',
                  color: msg.isMine ? 'white' : 'text.primary',
                  px: 2, py: 1,
                  borderRadius: msg.isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: 240,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
              <Typography variant="caption" color="text.disabled"
                sx={{ display: 'block', textAlign: msg.isMine ? 'right' : 'left', mt: 0.3, mx: 0.5 }}>
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Box>

      {/* Input area */}
      <Box sx={{ p: 2, borderTop: '1px solid #E8D5B7', bgcolor: '#FFF9F0', display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth size="small"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          sx={{ '& .MuiInputBase-root': { borderRadius: 3 } }}
        />
        <IconButton
          onClick={sendMessage}
          sx={{ bgcolor: '#8B6347', color: 'white', '&:hover': { bgcolor: '#5D4037' }, flexShrink: 0 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
