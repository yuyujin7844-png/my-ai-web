import { useState } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Box, TextField, Button,
  Typography, IconButton, CircularProgress, Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CHAMPAGNE_GOLD, DEEP_NAVY, CARD_NAVY } from '../../theme.js';
import { submitReservation } from '../../lib/supabase.js';

const FIELD_SX = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    color: '#F5F0E8',
    '& fieldset': { borderColor: 'rgba(212,175,55,0.3)' },
    '&:hover fieldset': { borderColor: CHAMPAGNE_GOLD },
    '&.Mui-focused fieldset': { borderColor: CHAMPAGNE_GOLD },
  },
  '& .MuiInputLabel-root': { color: '#A89B7A' },
  '& .MuiInputLabel-root.Mui-focused': { color: CHAMPAGNE_GOLD },
};

export default function ReservationModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', quantity: 1 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('이름과 이메일은 필수 항목입니다.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await submitReservation(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', quantity: 1 });
    } catch (err) {
      setError('예약 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: CARD_NAVY,
          border: `1px solid ${CHAMPAGNE_GOLD}33`,
          borderRadius: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          borderBottom: `1px solid ${CHAMPAGNE_GOLD}22`,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.3rem',
              color: '#F5F0E8',
            }}
          >
            사전 예약 신청
          </Typography>
          <Typography variant="caption" sx={{ color: CHAMPAGNE_GOLD, letterSpacing: '0.2em' }}>
            FRENCH BLOOM LE BLANC
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: '#ffffff66' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {success ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>🥂</Typography>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: CHAMPAGNE_GOLD,
                mb: 1,
              }}
            >
              예약이 완료되었습니다
            </Typography>
            <Typography variant="body2" sx={{ color: '#A89B7A' }}>
              입력하신 이메일로 확인 안내를 보내드립니다.
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ mt: 4, borderColor: CHAMPAGNE_GOLD, color: CHAMPAGNE_GOLD }}
            >
              닫기
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ borderRadius: 0, backgroundColor: '#2a1010' }}>
                {error}
              </Alert>
            )}

            <TextField
              name="name"
              label="이름 *"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={FIELD_SX}
            />
            <TextField
              name="email"
              label="이메일 *"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={FIELD_SX}
            />
            <TextField
              name="phone"
              label="연락처 (선택)"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              sx={FIELD_SX}
            />
            <TextField
              name="quantity"
              label="예약 수량"
              type="number"
              inputProps={{ min: 1, max: 10 }}
              value={form.quantity}
              onChange={handleChange}
              fullWidth
              sx={FIELD_SX}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: CHAMPAGNE_GOLD,
                color: DEEP_NAVY,
                fontWeight: 700,
                letterSpacing: '0.2em',
                py: 1.5,
                borderRadius: 0,
                '&:hover': { backgroundColor: '#C4A030' },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: MIDNIGHT_NAVY }} /> : '사전 예약 신청하기'}
            </Button>

            <Typography variant="caption" sx={{ color: '#ffffff33', textAlign: 'center' }}>
              * 사전 예약은 구매 확약이 아닙니다. 출시 시 우선 안내 혜택이 제공됩니다.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
