import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, IconButton, Avatar, Divider,
  Grid, CircularProgress, Chip, Stack, Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../context/AuthContext';
import { getUserById, getPostsByAuthor } from '../lib/api';
import PageHeader from '../components/PageHeader';

const PET_EMOJI = {
  강아지: '🐶', 고양이: '🐱', 햄스터: '🐹', 물고기: '🐠',
  토끼: '🐰', 도마뱀: '🦎', 앵무새: '🦜', 기타: '🐾',
};

export default function MyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [profileData, postsData] = await Promise.all([
        getUserById(user.id),
        getPostsByAuthor(user.id),
      ]);
      setProfile(profileData);
      setMyPosts(postsData);
      setLoading(false);
    })();
  }, [user.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const isPrivate = profile && profile.is_public === false;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        left={<IconButton onClick={() => navigate('/main')}><ArrowBackIcon /></IconButton>}
        right={
          <Tooltip title="프로필 수정">
            <IconButton onClick={() => navigate('/mypage/edit')} sx={{ color: 'primary.dark' }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        }
      />

      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* 프로필 섹션 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={profile?.profile_image}
            sx={{
              width: 100, height: 100, mb: 2,
              bgcolor: 'primary.light',
              border: '3px solid',
              borderColor: 'primary.main',
              fontSize: 40,
            }}
          >
            {!profile?.profile_image && <PetsIcon sx={{ fontSize: 50, color: 'primary.dark' }} />}
          </Avatar>

          <Typography variant="h5" fontWeight={700} color="primary.dark">
            {profile?.nickname}
          </Typography>

          {isPrivate ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: 'text.disabled' }}>
              <LockIcon fontSize="small" />
              <Typography variant="body2">비공개 프로필</Typography>
            </Box>
          ) : (
            <>
              {profile?.pet_types?.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mt: 2, gap: 1 }}>
                  {profile.pet_types.map((type, i) => (
                    <Chip
                      key={i}
                      label={`${PET_EMOJI[type] || '🐾'} ${type}${profile.pet_names?.[i] ? ` · ${profile.pet_names[i]}` : ''}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                  ))}
                </Stack>
              )}
              {(!profile?.pet_types || profile.pet_types.length === 0) && (
                <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                  반려동물 정보 없음
                </Typography>
              )}
            </>
          )}
        </Box>

        <Divider sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            게시물 {isPrivate ? '-' : myPosts.length}개
          </Typography>
        </Divider>

        {/* 인스타 피드 */}
        {isPrivate ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <LockIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
            <Typography color="text.disabled">비공개 계정입니다.</Typography>
          </Box>
        ) : myPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.disabled">아직 작성한 게시물이 없어요. 🐾</Typography>
          </Box>
        ) : (
          <Grid container spacing={0.5}>
            {myPosts.map((post) => (
              <Grid key={post.id} item xs={4}>
                <Box
                  onClick={() => navigate(`/post/${post.id}`)}
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                    '&:hover .overlay': { opacity: 1 },
                  }}
                >
                  <Box
                    component="img"
                    src={post.image_url || `https://picsum.photos/seed/${post.id.slice(0,8)}/300/300`}
                    alt={post.title}
                    sx={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                    }}
                  />
                  {/* hover 오버레이 */}
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%',
                      bgcolor: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                      opacity: 0, transition: 'opacity 0.2s',
                    }}
                  >
                    <FavoriteIcon sx={{ color: 'white', fontSize: 18 }} />
                    <Typography variant="body2" color="white" fontWeight={700}>
                      {post.like_count}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
