import { useState, useEffect } from 'react';
import {
  Box, Avatar, Typography, Grid, CircularProgress,
  Modal, IconButton, Button, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

export default function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (user) fetchMyPosts();
  }, [user]);

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('ms_posts')
      .select(`
        *,
        ms_users ( nickname, profile_image_url, username ),
        ms_comments ( id, content, created_at, ms_users ( nickname, profile_image_url ) )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ bgcolor: '#F5ECD7', minHeight: '100%' }}>
      {/* Profile section */}
      <Box sx={{ bgcolor: '#FFF9F0', p: 3, borderBottom: '1px solid #E8D5B7' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2.5 }}>
          <Avatar
            src={user?.profile_image_url}
            sx={{ width: 80, height: 80, border: '3px solid #C4956A', bgcolor: '#F5ECD7' }}
          >
            {user?.nickname?.[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#3E2723' }}>{user?.nickname}</Typography>
            <Typography variant="body2" color="text.secondary">@{user?.username}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
              🎬 영화와 공연을 사랑합니다
            </Typography>
          </Box>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 0 }}>
          {[
            { label: '게시물', value: posts.length },
            { label: '팔로워', value: 24 },
            { label: '팔로잉', value: 12 },
          ].map(({ label, value }, i) => (
            <Box key={label} sx={{
              flex: 1, textAlign: 'center', py: 1,
              borderLeft: i > 0 ? '1px solid #E8D5B7' : 'none',
            }}>
              <Typography variant="h6" fontWeight={800}>{value}</Typography>
              <Typography variant="caption" color="text.secondary">{label}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: '#E8D5B7', my: 2 }} />
        <Button
          fullWidth variant="outlined" size="small"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ borderColor: '#E8D5B7', color: '#795548', '&:hover': { borderColor: '#C4956A' } }}
        >
          로그아웃
        </Button>
      </Box>

      {/* Post grid */}
      {loading ? (
        <Box sx={{ p: 5, textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#8B6347' }} />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ p: 5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 40 }}>🎬</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>아직 게시물이 없어요</Typography>
        </Box>
      ) : (
        <Grid container spacing={0.5} sx={{ p: 0.5, mt: 0.5 }}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box
                onClick={() => setSelectedPost(post)}
                sx={{ aspectRatio: '1/1', overflow: 'hidden', cursor: 'pointer', bgcolor: '#E8D5B7' }}
              >
                <Box
                  component="img"
                  src={post.image_url}
                  alt="post thumbnail"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Full post modal */}
      <Modal open={!!selectedPost} onClose={() => setSelectedPost(null)}>
        <Box sx={{
          position: 'fixed', inset: 0,
          bgcolor: 'rgba(30,20,10,0.75)',
          display: 'flex', flexDirection: 'column',
          maxWidth: 480, mx: 'auto',
          zIndex: 1300,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
            <IconButton onClick={() => setSelectedPost(null)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: '#F5ECD7' }}>
            {selectedPost && <PostCard post={selectedPost} />}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
