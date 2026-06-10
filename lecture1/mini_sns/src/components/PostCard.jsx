import { useState } from 'react';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, IconButton, Typography, Box, Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ModeComment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { supabase } from '../supabase';
import CommentModal from './CommentModal';

function timeAgo(ts) {
  const diff = (Date.now() - new Date(ts)) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const author = post.ms_users || {};
  const comments = post.ms_comments || [];
  const previewComments = [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 2).reverse();

  const handleLike = async () => {
    const newLiked = !liked;
    const delta = newLiked ? 1 : -1;
    setLiked(newLiked);
    setLikesCount((n) => n + delta);
    await supabase.from('ms_posts').update({ likes_count: likesCount + delta }).eq('id', post.id);
  };

  return (
    <>
      <Card sx={{ mb: 0, borderRadius: 0, boxShadow: 'none', borderBottom: '8px solid #F5ECD7', bgcolor: '#FFF9F0' }}>
        <CardHeader
          avatar={
            <Avatar src={author.profile_image_url} sx={{ width: 38, height: 38 }}>
              {author.nickname?.[0]}
            </Avatar>
          }
          title={<Typography variant="body2" fontWeight={700}>{author.nickname}</Typography>}
          subheader={
            post.location ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <LocationOnIcon sx={{ fontSize: 11, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">{post.location}</Typography>
              </Box>
            ) : null
          }
          sx={{ pt: 1.5, pb: 1, px: 2 }}
        />
        <CardMedia
          component="img"
          image={post.image_url || `https://picsum.photos/seed/${post.id}/400/400`}
          alt="post image"
          sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
        />
        <CardActions sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
          <IconButton size="small" onClick={handleLike} sx={{ p: 0.5 }}>
            {liked
              ? <FavoriteIcon sx={{ fontSize: 24, color: '#E57373' }} />
              : <FavoriteBorderIcon sx={{ fontSize: 24 }} />}
          </IconButton>
          <Typography variant="body2" fontWeight={700} sx={{ mr: 1.5 }}>{likesCount}</Typography>
          <IconButton size="small" onClick={() => setCommentsOpen(true)} sx={{ p: 0.5 }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <Typography variant="body2" fontWeight={700}>{comments.length}</Typography>
        </CardActions>
        <CardContent sx={{ pt: 0.5, pb: '12px !important', px: 2 }}>
          {post.caption && (
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <span style={{ fontWeight: 700, marginRight: 6 }}>{author.nickname}</span>
              {post.caption}
            </Typography>
          )}
          {post.hashtags?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
              {post.hashtags.map((tag) => (
                <Typography key={tag} variant="caption" sx={{ color: '#8B6347', fontWeight: 500 }}>{tag}</Typography>
              ))}
            </Box>
          )}
          {previewComments.map((c) => (
            <Typography key={c.id} variant="body2" sx={{ lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, marginRight: 6 }}>{c.ms_users?.nickname || '익명'}</span>
              {c.content}
            </Typography>
          ))}
          {comments.length > 2 && (
            <Typography
              variant="caption" color="text.secondary"
              sx={{ cursor: 'pointer', mt: 0.3, display: 'block' }}
              onClick={() => setCommentsOpen(true)}
            >
              댓글 {comments.length}개 모두 보기
            </Typography>
          )}
          <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
            {timeAgo(post.created_at)}
          </Typography>
        </CardContent>
      </Card>
      <CommentModal open={commentsOpen} onClose={() => setCommentsOpen(false)} post={post} />
    </>
  );
}
