import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box, Container, Typography, Button, IconButton, TextField,
  InputAdornment, Card, CardContent, CardMedia, CardActionArea,
  Grid, Drawer, List, ListItem, ListItemButton, Divider,
  AppBar, Toolbar, Tooltip, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from '../context/AuthContext';
import { getPosts, searchPosts } from '../lib/api';

const CATEGORIES = [
  { id: '인기스팟', icon: '📍', desc: '애견카페 & 유명장소' },
  { id: '반려스테이', icon: '🏨', desc: '반려동물 동반 숙소' },
  { id: '함께해요', icon: '🐾', desc: '지역별 모임' },
  { id: 'Q&A', icon: '💬', desc: '걱정・고민 정보 교환' },
];

function PostCard({ post, onClick }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => onClick(post.id)} sx={{ height: '100%' }}>
        {post.image_url && (
          <CardMedia
            component="img"
            height="150"
            image={post.image_url}
            alt={post.title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="subtitle2" fontWeight={700} noWrap color="text.primary">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
            {post.content}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <FavoriteIcon sx={{ fontSize: 13, color: 'secondary.main' }} />
            <Typography variant="caption" color="text.secondary">{post.like_count}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto' }}>
              {post.author_nickname}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function MainPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef({});

  useEffect(() => {
    loadAllPosts();
  }, []);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) {
      setSearchQuery(q);
      handleSearch(q);
    }
  }, [searchParams]);

  const loadAllPosts = async () => {
    setLoading(true);
    const result = {};
    await Promise.all(
      CATEGORIES.map(async (cat) => {
        const data = await getPosts(cat.id);
        result[cat.id] = data;
      })
    );
    setPosts(result);
    setLoading(false);
  };

  const handleSearch = async (q = searchQuery) => {
    if (!q.trim()) { setSearchResults(null); return; }
    const results = await searchPosts(q.trim());
    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const scrollToSection = (categoryId) => {
    setDrawerOpen(false);
    sectionRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,248,225,0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'primary.light',
        }}
      >
        <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
          <PetsIcon sx={{ color: 'primary.dark' }} />
          <Typography variant="subtitle1" fontWeight={800} color="primary.dark" sx={{ mr: 1 }}>
            멍냥스타그램
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {user?.nickname}님 환영해요! 🐾
          </Typography>

          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex' }}>
            <TextField
              size="small"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" size="small">
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: 150, '& .MuiOutlinedInput-root': { borderRadius: 6 } }}
            />
          </Box>

          <Tooltip title="게시물 추가">
            <IconButton onClick={() => navigate('/write')} sx={{ color: 'primary.dark' }}>
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="전체 메뉴">
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'primary.dark' }}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="로그아웃">
            <IconButton onClick={() => { logout(); navigate('/'); }} sx={{ color: 'text.secondary' }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PetsIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={700} color="primary.dark">전체 메뉴</Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List>
            {CATEGORIES.map((cat) => (
              <ListItem key={cat.id} disablePadding>
                <ListItemButton onClick={() => scrollToSection(cat.id)} sx={{ borderRadius: 2, mb: 0.5 }}>
                  <Typography sx={{ mr: 1.5, fontSize: 20 }}>{cat.icon}</Typography>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{cat.id}</Typography>
                    <Typography variant="caption" color="text.secondary">{cat.desc}</Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {searchResults !== null ? (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" fontWeight={700} color="primary.dark">
                검색 결과: "{searchQuery}" ({searchResults.length}건)
              </Typography>
              <Button onClick={clearSearch} size="small" variant="outlined">전체 보기</Button>
            </Box>
            {searchResults.length === 0 ? (
              <Typography color="text.disabled" textAlign="center" sx={{ py: 4 }}>
                검색 결과가 없습니다. 🐾
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {searchResults.map((post) => (
                  <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
                    <PostCard post={post} onClick={(id) => navigate(`/post/${id}`)} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          CATEGORIES.map((cat) => (
            <Box
              key={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              sx={{ mb: 6 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography sx={{ fontSize: 28 }}>{cat.icon}</Typography>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="primary.dark">{cat.id}</Typography>
                  <Typography variant="body2" color="text.secondary">{cat.desc}</Typography>
                </Box>
              </Box>

              {posts[cat.id]?.length > 0 ? (
                <Grid container spacing={2}>
                  {posts[cat.id].map((post) => (
                    <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
                      <PostCard post={post} onClick={(id) => navigate(`/post/${id}`)} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'primary.light',
                    bgcolor: 'rgba(249,199,79,0.05)',
                  }}
                >
                  <Typography color="text.secondary">
                    아직 게시물이 없어요. 첫 번째 글을 작성해보세요! 🐾
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1.5 }}
                    onClick={() => navigate('/write')}
                  >
                    글 쓰기
                  </Button>
                </Box>
              )}
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}
