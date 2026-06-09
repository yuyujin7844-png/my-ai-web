import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, IconButton, Avatar, Button,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Switch, Divider, Alert, CircularProgress,
  Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../context/AuthContext';
import { getUserById, updateUser, deleteUser } from '../lib/api';
import PageHeader from '../components/PageHeader';

const PET_OPTIONS = ['강아지', '고양이', '햄스터', '물고기', '토끼', '도마뱀', '앵무새', '기타'];

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, updateUserData, logout } = useAuth();
  const [form, setForm] = useState({
    nickname: '',
    profile_image: '',
    pet_types: [],
    pet_names: [],
    is_public: true,
  });
  const [newPetType, setNewPetType] = useState('강아지');
  const [newPetName, setNewPetName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    getUserById(user.id).then((profile) => {
      setForm({
        nickname: profile.nickname || '',
        profile_image: profile.profile_image || '',
        pet_types: profile.pet_types || [],
        pet_names: profile.pet_names || [],
        is_public: profile.is_public !== false,
      });
      setLoading(false);
    });
  }, [user.id]);

  const handleRandomImage = () => {
    const seed = Math.floor(Math.random() * 1000);
    setForm({ ...form, profile_image: `https://picsum.photos/seed/${seed}/300/300` });
  };

  const handleAddPet = () => {
    if (!newPetType) return;
    setForm({
      ...form,
      pet_types: [...form.pet_types, newPetType],
      pet_names: [...form.pet_names, newPetName],
    });
    setNewPetName('');
  };

  const handleRemovePet = (idx) => {
    setForm({
      ...form,
      pet_types: form.pet_types.filter((_, i) => i !== idx),
      pet_names: form.pet_names.filter((_, i) => i !== idx),
    });
  };

  const handleSave = async () => {
    if (!form.nickname.trim()) { setError('닉네임을 입력해주세요.'); return; }
    setError('');
    setSaving(true);
    try {
      const updated = await updateUser(user.id, {
        nickname: form.nickname.trim(),
        profile_image: form.profile_image || null,
        pet_types: form.pet_types,
        pet_names: form.pet_names,
        is_public: form.is_public,
      });
      updateUserData(updated);
      navigate('/mypage');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      logout();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const disabled = !form.is_public;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        left={<IconButton onClick={() => navigate('/mypage')}><ArrowBackIcon /></IconButton>}
      />

      <Container maxWidth="sm" sx={{ py: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        {/* 프로필 이미지 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={form.profile_image}
              sx={{
                width: 100, height: 100,
                bgcolor: 'primary.light',
                border: '3px solid',
                borderColor: 'primary.main',
              }}
            >
              {!form.profile_image && <PetsIcon sx={{ fontSize: 50, color: 'primary.dark' }} />}
            </Avatar>
            <IconButton
              onClick={handleRandomImage}
              size="small"
              sx={{
                position: 'absolute', bottom: 0, right: 0,
                bgcolor: 'primary.main', color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            카메라 아이콘을 눌러 랜덤 이미지로 변경
          </Typography>
        </Box>

        {/* 공개/비공개 */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            p: 2, borderRadius: 3, bgcolor: 'primary.light', mb: 3,
          }}
        >
          <Typography variant="body1" fontWeight={600} color="primary.dark">
            {form.is_public ? '🔓 공개 프로필' : '🔒 비공개 프로필'}
          </Typography>
          <Switch
            checked={form.is_public}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
            color="primary"
          />
        </Box>

        {/* 닉네임 */}
        <TextField
          fullWidth
          label="닉네임"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          disabled={disabled}
          sx={{ mb: 3 }}
          required
        />

        {/* 반려동물 목록 */}
        {form.pet_types.length > 0 && (
          <Stack direction="row" flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
            {form.pet_types.map((type, i) => (
              <Chip
                key={i}
                label={`${type}${form.pet_names[i] ? ` · ${form.pet_names[i]}` : ''}`}
                onDelete={() => handleRemovePet(i)}
                color="primary"
                variant="outlined"
                disabled={disabled}
              />
            ))}
          </Stack>
        )}

        {/* 반려동물 추가 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <FormControl sx={{ minWidth: 120 }} disabled={disabled}>
            <InputLabel>종류</InputLabel>
            <Select
              value={newPetType}
              label="종류"
              onChange={(e) => setNewPetType(e.target.value)}
            >
              {PET_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="이름"
            value={newPetName}
            onChange={(e) => setNewPetName(e.target.value)}
            disabled={disabled}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="outlined"
            onClick={handleAddPet}
            disabled={disabled}
            startIcon={<AddIcon />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            추가
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
          반려동물 종류 선택 후 이름 입력하고 추가 버튼을 눌러주세요.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 수정완료 */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSave}
          disabled={saving}
          sx={{ borderRadius: 3, py: 1.5 }}
        >
          {saving ? '저장 중...' : '수정완료'}
        </Button>

        {/* 탈퇴 확인 다이얼로그 */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>정말 탈퇴하시겠어요?</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              탈퇴하면 계정과 작성한 게시물, 댓글이 모두 삭제되며 복구할 수 없습니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>취소</Button>
            <Button onClick={handleDelete} color="error" variant="contained">탈퇴</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
