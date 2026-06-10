import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { supabase } from '../supabase';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('ms_posts')
      .select(`
        *,
        ms_users ( nickname, profile_image_url, username ),
        ms_comments ( id, content, created_at, ms_users ( nickname, profile_image_url ) )
      `)
      .order('created_at', { ascending: false })
      .limit(30);
    setPosts(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#8B6347' }} />
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 48 }}>🎬</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>아직 게시물이 없어요</Typography>
        <Typography variant="body2" color="text.disabled">첫 번째 게시물을 올려보세요!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F5ECD7' }}>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </Box>
  );
}
