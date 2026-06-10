import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  TextField, Avatar, Drawer, Tab, Tabs,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

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

const EMOJI_GROUPS = [
  {
    label: '감정',
    emojis: ['😊','😂','🥰','😍','😭','😤','😮','😴','🤔','😎','🤩','🥲','😇','😏','🫠','😬'],
  },
  {
    label: '🎬 영화·공연',
    emojis: ['🎬','🎭','🎥','🎞️','🍿','🏆','⭐','🌟','🎤','🎵','🎸','🎺','🎻','🎹','🎼','🎊'],
  },
  {
    label: '반응',
    emojis: ['👍','👎','❤️','💕','🙌','👏','🤝','🫶','🔥','💯','✨','🎉','💫','💖','🌈','😆'],
  },
];

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [emojiTab, setEmojiTab] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

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

  const insertEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setEmojiOpen(false);
    inputRef.current?.focus();
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
            sx={{ display: 'flex', flexDirection: msg.isMine ? 'row-reverse' : 'row', alignItems: 'flex-end', mb: 1.5, gap: 1 }}
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
              <Box sx={{
                bgcolor: msg.isMine ? '#8B6347' : '#FFF9F0',
                color: msg.isMine ? 'white' : 'text.primary',
                px: 2, py: 1,
                borderRadius: msg.isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                maxWidth: 240,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}>
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
      <Box sx={{ p: 1.5, borderTop: '1px solid #E8D5B7', bgcolor: '#FFF9F0', display: 'flex', gap: 0.5, alignItems: 'center' }}>
        <IconButton size="small" onClick={() => setEmojiOpen(true)} sx={{ color: '#C4956A', flexShrink: 0 }}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <TextField
          inputRef={inputRef}
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

      {/* Emoji picker */}
      <Drawer
        anchor="bottom"
        open={emojiOpen}
        onClose={() => setEmojiOpen(false)}
        PaperProps={{
          sx: {
            maxWidth: 480, mx: 'auto',
            borderRadius: '20px 20px 0 0',
            bgcolor: '#FFF9F0',
          },
        }}
      >
        <Box sx={{ p: 1.5, pb: 0 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: '#E8D5B7', borderRadius: 2, mx: 'auto', mb: 1 }} />
          <Tabs
            value={emojiTab}
            onChange={(_, v) => setEmojiTab(v)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': { fontSize: 12, minHeight: 36, color: '#795548' },
              '& .Mui-selected': { color: '#8B6347 !important' },
              '& .MuiTabs-indicator': { bgcolor: '#8B6347' },
            }}
          >
            {EMOJI_GROUPS.map((g, i) => (
              <Tab key={i} label={g.label} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {EMOJI_GROUPS[emojiTab].emojis.map((emoji) => (
              <Box
                key={emoji}
                onClick={() => insertEmoji(emoji)}
                sx={{
                  fontSize: 28, cursor: 'pointer', p: 0.8, borderRadius: 2,
                  lineHeight: 1,
                  '&:hover': { bgcolor: '#F5ECD7', transform: 'scale(1.2)' },
                  transition: 'transform 0.1s',
                }}
              >
                {emoji}
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
