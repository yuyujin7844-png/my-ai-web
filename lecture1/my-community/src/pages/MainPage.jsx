import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box, Container, Typography, Button, IconButton, TextField,
  InputAdornment, Card, CardContent, CardMedia, CardActionArea,
  Drawer, List, ListItem, ListItemButton, Divider,
  AppBar, Toolbar, Tooltip, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from '../context/AuthContext';
import { getPosts, searchPosts } from '../lib/api';
import { getAnimalImage } from '../lib/utils';

const CATEGORIES = [
  { id: '인기스팟', icon: '📍', desc: '애견카페 & 유명장소' },
  { id: '반려스테이', icon: '🏨', desc: '반려동물 동반 숙소' },
  { id: '함께해요', icon: '🐾', desc: '지역별 모임' },
  { id: 'Q&A', icon: '💬', desc: '걱정・고민 정보 교환' },
];

function isNew(createdAt) {
  return Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000;
}

function PostCard({ post, onClick }) {
  const newPost = isNew(post.created_at);
  const imageSrc = post.image_url || getAnimalImage(post.id);

  return (
    <Card sx={{ width: 280, flexShrink: 0, height: '100%' }}>
      <CardActionArea onClick={() => onClick(post.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="160"
            image={imageSrc}
            alt={post.title}
            sx={{ objectFit: 'cover' }}
          />
          {newPost && (
            <Box
              sx={{
                position: 'absolute', top: 8, left: 8,
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
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={800} color="text.primary"
            sx={{ mb: 0.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary"
            sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.content}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon sx={{ fontSize: 13, color: 'secondary.main' }} />
            <Typography variant="caption" color="text.secondary">{post.like_count}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto' }}>{post.author_nickname}</Typography>
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
      {/* ── 1번 박스: 전체메뉴 / 로고(가운데) / 게시물추가+로그아웃 ── */}
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
        <Toolbar sx={{ position: 'relative', justifyContent: 'center', minHeight: 64 }}>
          {/* 왼쪽: 전체 메뉴 */}
          <Box sx={{ position: 'absolute', left: 8 }}>
            <Tooltip title="전체 메뉴">
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'primary.dark' }}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* 가운데: 로고 (클릭 시 메인 이동) */}
          <Box
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
          >
            <PetsIcon sx={{ fontSize: 36, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={800} color="primary.dark">
              멍냥스타그램
            </Typography>
          </Box>

          {/* 오른쪽: 로그인 상태에 따라 아이콘 변경 */}
          <Box sx={{ position: 'absolute', right: 8, display: 'flex', gap: 0.5 }}>
            {user ? (
              <>
                <Tooltip title="게시물 추가">
                  <IconButton onClick={() => navigate('/write')} sx={{ color: 'primary.dark' }}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="로그아웃">
                  <IconButton onClick={() => { logout(); navigate('/'); }} sx={{ color: 'text.secondary' }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="로그인">
                <IconButton onClick={() => navigate('/login')} sx={{ color: 'primary.dark' }}>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>

        {/* ── 2번 박스: 환영 멘트 + 검색창 ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            px: 2,
            borderTop: '1px solid',
            borderColor: 'rgba(249,199,79,0.3)',
          }}
        >
          <Typography variant="body1" fontWeight={600} color="primary.dark" sx={{ mb: 1.5 }}>
            {user ? (
              <>
                <Box
                  component="span"
                  onClick={() => navigate('/mypage')}
                  sx={{ cursor: 'pointer', textDecoration: 'underline', textDecorationColor: 'primary.main' }}
                >
                  {user.nickname}님
                </Box>
                {' '}환영해요! 🐾
              </>
            ) : (
              '로그인해서 멍냥스타그램의 다양한 서비스를 경험해보세요! 🐾'
            )}
          </Typography>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ width: '100%', maxWidth: 520 }}>
            <TextField
              fullWidth
              placeholder="장소, 게시물을 검색해보세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.dark' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 6, bgcolor: 'white' } }}
            />
          </Box>
        </Box>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PetsIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={700} color="primary.dark">전체 메뉴</Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => { setDrawerOpen(false); navigate('/mypage'); }}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <Typography sx={{ mr: 1.5, fontSize: 20 }}>👤</Typography>
                <Box>
                  <Typography variant="body1" fontWeight={600}>마이페이지</Typography>
                  <Typography variant="caption" color="text.secondary">내 프로필 · 내 게시물</Typography>
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            {CATEGORIES.map((cat) => (
              <ListItem key={cat.id} disablePadding>
                <ListItemButton
                  onClick={() => { setDrawerOpen(false); navigate(`/category/${cat.id}`); }}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
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
              <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1.5,
                '&::-webkit-scrollbar': { height: 6 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.light', borderRadius: 3 },
              }}>
                {searchResults.map((post) => (
                  <PostCard key={post.id} post={post} onClick={(id) => navigate(`/post/${id}`)} />
                ))}
              </Box>
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
              sx={{ mb: 20 }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, cursor: 'pointer' }}
                onClick={() => navigate(`/category/${cat.id}`)}
              >
                <Typography sx={{ fontSize: 28 }}>{cat.icon}</Typography>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="primary.dark">{cat.id}</Typography>
                  <Typography variant="body2" color="text.secondary">{cat.desc}</Typography>
                </Box>
                <Typography variant="body2" color="primary.main" sx={{ ml: 'auto', fontWeight: 600 }}>
                  전체보기 →
                </Typography>
              </Box>

              {posts[cat.id]?.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    pb: 1.5,
                    '&::-webkit-scrollbar': { height: 6 },
                    '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.light', borderRadius: 3 },
                  }}
                >
                  {posts[cat.id].map((post) => (
                    <PostCard key={post.id} post={post} onClick={(id) => navigate(`/post/${id}`)} />
                  ))}
                </Box>
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
