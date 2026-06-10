import { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, TextField, Button,
  Avatar, Divider, CircularProgress,
} from '@mui/material';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

function timeAgo(ts) {
  const diff = (Date.now() - new Date(ts)) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function CommentModal({ open, onClose, post }) {
  const { user } = useAuth();
  const [comments, setComments] = useState(post.ms_comments || []);
  const [input, setInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('ms_comments')
      .select('*, ms_users(nickname, profile_image_url)')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    if (data) setComments(data);
  };

  const handleSubmit = async () => {
    if (!input.trim() || !user) return;
    setSubmitting(true);
    const { data } = await supabase
      .from('ms_comments')
      .insert({ content: input.trim(), user_id: user.id, post_id: post.id })
      .select('*, ms_users(nickname, profile_image_url)')
      .single();
    if (data) setComments((prev) => [...prev, data]);
    setInput('');
    setSubmitting(false);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth: 480, mx: 'auto',
          borderRadius: '20px 20px 0 0',
          maxHeight: '72vh',
          display: 'flex', flexDirection: 'column',
          bgcolor: '#FFF9F0',
        },
      }}
    >
      {/* Handle + title */}
      <Box sx={{ p: 2, pb: 1, borderBottom: '1px solid #E8D5B7' }}>
        <Box sx={{ width: 40, height: 4, bgcolor: '#E8D5B7', borderRadius: 2, mx: 'auto', mb: 1.5 }} />
        <Typography variant="subtitle1" fontWeight={700} textAlign="center">댓글</Typography>
      </Box>

      {/* Comment list */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {comments.length === 0 && (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 5 }}>
            첫 댓글을 남겨보세요 😊
          </Typography>
        )}
        {comments.map((c) => (
          <Box key={c.id} sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
            <Avatar src={c.ms_users?.profile_image_url} sx={{ width: 34, height: 34, flexShrink: 0 }}>
              {c.ms_users?.nickname?.[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.3 }}>
                <Typography variant="body2" fontWeight={700}>{c.ms_users?.nickname || '익명'}</Typography>
                <Typography variant="caption" color="text.disabled">{timeAgo(c.created_at)}</Typography>
              </Box>
              <Typography variant="body2" color="text.primary">{c.content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ borderColor: '#E8D5B7' }} />

      {/* Input */}
      <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center', bgcolor: '#FFF9F0' }}>
        <Avatar src={user?.profile_image_url} sx={{ width: 32, height: 32 }}>
          {user?.nickname?.[0]}
        </Avatar>
        <TextField
          size="small" fullWidth
          placeholder="댓글 입력..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          sx={{ '& .MuiInputBase-root': { bgcolor: '#F5ECD7', borderRadius: 3 } }}
        />
        <Button
          variant="contained" size="small"
          onClick={handleSubmit}
          disabled={!input.trim() || submitting}
          sx={{ minWidth: 58, flexShrink: 0 }}
        >
          {submitting ? <CircularProgress size={14} color="inherit" /> : '등록'}
        </Button>
      </Box>
    </Drawer>
  );
}
