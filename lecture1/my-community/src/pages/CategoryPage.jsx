import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Card, CardActionArea,
  CardMedia, CardContent, IconButton, Chip, CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPosts } from '../lib/api';
import PageHeader from '../components/PageHeader';

const CATEGORY_META = {
  '인기스팟':  { icon: '📍', desc: '애견카페 & 유명장소' },
  '반려스테이': { icon: '🏨', desc: '반려동물 동반 숙소' },
  '함께해요':  { icon: '🐾', desc: '지역별 모임' },
  'Q&A':      { icon: '💬', desc: '걱정・고민 정보 교환' },
};

const FALLBACK_IMAGES = [
  'https://picsum.photos/seed/cat1/600/400',
  'https://picsum.photos/seed/dog2/600/400',
  'https://picsum.photos/seed/pet3/600/400',
];

function isNew(createdAt) {
  return Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000;
}

function PostCard({ post, onClick }) {
  const imageSrc = post.image_url || FALLBACK_IMAGES[Math.abs(post.id.charCodeAt(0)) % 3];
  const newPost = isNew(post.created_at);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(249,199,79,0.25)',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <CardActionArea onClick={() => onClick(post.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        {/* 이미지 + NEW 뱃지 */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={imageSrc}
            alt={post.title}
            sx={{ objectFit: 'cover' }}
          />
          {newPost && (
            <Box
              sx={{
                position: 'absolute', top: 10, left: 10,
                bgcolor: 'secondary.main', color: 'white',
                fontSize: 11, fontWeight: 800,
                px: 1, py: 0.3, borderRadius: 1,
                letterSpacing: 1,
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              NEW
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
          <Typography
            variant="h6" fontWeight={800} color="text.primary"
            sx={{ mb: 0.8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2" color="text.secondary"
            sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {post.content}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <FavoriteIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
              <Typography variant="caption" color="text.secondary">{post.like_count}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: 'primary.dark' }} />
              <Typography variant="caption" color="text.secondary">{post.comment_count}</Typography>
            </Box>
            <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto' }}>{post.author_nickname}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const meta = CATEGORY_META[categoryId] || { icon: '🐾', desc: '' };

  useEffect(() => {
    setLoading(true);
    getPosts(categoryId).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        left={<IconButton onClick={() => navigate('/main')}><ArrowBackIcon /></IconButton>}
        right={
          <IconButton onClick={() => navigate('/write')} sx={{ color: 'primary.dark' }}>
            <EditIcon />
          </IconButton>
        }
      />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* 카테고리 타이틀 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Typography sx={{ fontSize: 32 }}>{meta.icon}</Typography>
          <Box>
            <Typography variant="h5" fontWeight={800} color="primary.dark">
              {categoryId}
            </Typography>
            <Typography variant="body2" color="text.secondary">{meta.desc}</Typography>
          </Box>
          <Chip
            label={`${posts.length}개`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ ml: 'auto' }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : posts.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center', py: 8,
              borderRadius: 3, border: '2px dashed',
              borderColor: 'primary.light',
              bgcolor: 'rgba(249,199,79,0.04)',
            }}
          >
            <Typography sx={{ fontSize: 40, mb: 1 }}>{meta.icon}</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              아직 게시물이 없어요. 첫 번째 글을 작성해보세요!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid key={post.id} item xs={12} sm={12} md={12} lg={12}>
                <PostCard post={post} onClick={(id) => navigate(`/post/${id}`)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
