import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Paper, Typography, IconButton, Button,
  TextField, Divider, Chip, Stack, Avatar, Alert,
  CircularProgress, Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../context/AuthContext';
import {
  getPost, getComments, createComment,
  togglePostLike, isPostLiked, getPostLikeCount,
} from '../lib/api';
import PageHeader from '../components/PageHeader';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [postData, commentsData, likedStatus, count] = await Promise.all([
          getPost(id),
          getComments(id),
          isPostLiked(id, user.id),
          getPostLikeCount(id),
        ]);
        setPost(postData);
        setComments(commentsData);
        setLiked(likedStatus);
        setLikeCount(count);
      } catch {
        setError('게시물을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user.id]);

  const handleLike = async () => {
    const newLiked = await togglePostLike(id, user.id);
    setLiked(newLiked);
    setLikeCount((c) => newLiked ? c + 1 : c - 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    alert('링크가 복사되었습니다!');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const newComment = await createComment({
        post_id: id,
        author_id: user.id,
        author_nickname: user.nickname,
        content: commentText,
      });
      setComments([...comments, newComment]);
      setCommentText('');
    } catch {
      setError('댓글 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="text.secondary">게시물을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate('/main')} sx={{ mt: 2 }}>돌아가기</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        left={<IconButton onClick={() => navigate('/main')}><ArrowBackIcon /></IconButton>}
        right={<Chip label={post.category} color="primary" size="small" variant="outlined" />}
      />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '2px solid',
            borderColor: 'primary.light',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {post.image_url && (
            <Box sx={{ width: '100%', height: 280, overflow: 'hidden' }}>
              <img
                src={post.image_url}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}

          <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} color="primary.dark" sx={{ mb: 1.5 }}>
              {post.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12, color: 'primary.contrastText' }}>
                {post.author_nickname?.[0]}
              </Avatar>
              <Typography variant="body2" fontWeight={600}>{post.author_nickname}</Typography>
              <Typography variant="body2" color="text.disabled">·</Typography>
              <Typography variant="body2" color="text.disabled">
                {new Date(post.created_at).toLocaleDateString('ko-KR')}
              </Typography>
            </Box>

            <Typography variant="body1" color="text.primary" sx={{ mb: 2, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
              {post.content}
            </Typography>

            {post.hashtags?.length > 0 && (
              <Stack direction="row" flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
                {post.hashtags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" color="primary" />
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                onClick={handleLike}
                sx={{ color: liked ? 'secondary.main' : 'text.disabled', p: 1 }}
              >
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>{likeCount}</Typography>

              <Tooltip title="링크 복사">
                <IconButton onClick={handleShare} sx={{ color: 'text.secondary', p: 1 }}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: '2px solid',
            borderColor: 'primary.light',
          }}
        >
          <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ mb: 2 }}>
            댓글 {comments.length}개
          </Typography>

          {comments.length === 0 ? (
            <Typography color="text.disabled" textAlign="center" sx={{ py: 2 }}>
              첫 번째 댓글을 남겨보세요! 🐾
            </Typography>
          ) : (
            <Box sx={{ mb: 3 }}>
              {comments.map((comment, idx) => (
                <Box key={comment.id}>
                  <Box sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.light', color: 'primary.dark', fontSize: 11 }}>
                        {comment.author_nickname?.[0]}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>{comment.author_nickname}</Typography>
                      <Typography variant="caption" color="text.disabled">
                        {new Date(comment.created_at).toLocaleDateString('ko-KR')}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.primary" sx={{ ml: 4 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                  {idx < comments.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          )}

          <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="댓글을 입력해주세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 6 } }}
            />
            <IconButton
              type="submit"
              disabled={submitting || !commentText.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' },
                '&:disabled': { bgcolor: 'grey.200' },
              }}
            >
              {submitting ? <CircularProgress size={20} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
