import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function BaseDialog({ open, onClose, title, children, actions, onBackdropClick }) {
  return (
    <Dialog
      open={open}
      onClose={onBackdropClick ?? onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', top: 12, right: 12 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>{actions}</DialogActions>
    </Dialog>
  );
}

export default function Section17() {
  const [basic, setBasic] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [info, setInfo] = useState(false);
  const [warn, setWarn] = useState(false);
  const [result, setResult] = useState(null);

  const handleConfirm = (ok) => {
    setConfirm(false);
    setResult(ok ? 'confirmed' : 'cancelled');
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 17 — Modal
      </Typography>
      <Divider className="section-divider" />

      <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mt: 2, mb: 3 }}>
        <Button variant="contained" onClick={() => setBasic(true)}>
          기본 모달
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setConfirm(true)}>
          삭제 확인
        </Button>
        <Button variant="outlined" color="info" startIcon={<InfoIcon />} onClick={() => setInfo(true)}>
          안내 모달
        </Button>
        <Button variant="outlined" color="warning" startIcon={<WarningAmberIcon />} onClick={() => setWarn(true)}>
          경고 모달
        </Button>
      </Stack>

      {result && (
        <Alert
          severity={result === 'confirmed' ? 'error' : 'info'}
          icon={result === 'confirmed' ? <DeleteIcon /> : <CloseIcon />}
          onClose={() => setResult(null)}
          sx={{ display: 'inline-flex', mb: 2 }}
        >
          {result === 'confirmed' ? '항목이 삭제되었습니다.' : '삭제가 취소되었습니다.'}
        </Alert>
      )}

      {/* 기본 모달 */}
      <BaseDialog
        open={basic}
        onClose={() => setBasic(false)}
        title="기본 모달"
        actions={
          <>
            <Button onClick={() => setBasic(false)}>취소</Button>
            <Button variant="contained" onClick={() => setBasic(false)} startIcon={<CheckCircleIcon />}>
              확인
            </Button>
          </>
        }
      >
        <DialogContentText gutterBottom>
          이것은 기본 모달 예제입니다. MUI의 <strong>Dialog</strong> 컴포넌트를 사용합니다.
        </DialogContentText>
        <DialogContentText>
          우측 상단 <strong>✕</strong> 버튼 또는 하단 버튼, 배경 클릭으로 닫을 수 있습니다.
        </DialogContentText>
      </BaseDialog>

      {/* 삭제 확인 모달 */}
      <BaseDialog
        open={confirm}
        onClose={() => handleConfirm(false)}
        onBackdropClick={() => handleConfirm(false)}
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            <DeleteIcon color="error" />
            항목 삭제
          </Stack>
        }
        actions={
          <>
            <Button onClick={() => handleConfirm(false)}>취소</Button>
            <Button variant="contained" color="error" onClick={() => handleConfirm(true)} startIcon={<DeleteIcon />}>
              삭제
            </Button>
          </>
        }
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          이 작업은 되돌릴 수 없습니다.
        </Alert>
        <DialogContentText>
          선택한 항목을 정말 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.
        </DialogContentText>
      </BaseDialog>

      {/* 안내 모달 */}
      <BaseDialog
        open={info}
        onClose={() => setInfo(false)}
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            <InfoIcon color="info" />
            서비스 안내
          </Stack>
        }
        actions={
          <Button variant="contained" color="info" onClick={() => setInfo(false)}>
            확인했습니다
          </Button>
        }
      >
        <DialogContentText gutterBottom>
          새로운 기능이 업데이트되었습니다. 아래 내용을 확인해 주세요.
        </DialogContentText>
        <Stack spacing={1} sx={{ mt: 1.5 }}>
          {['다크 모드 지원 추가', '성능 최적화 (로딩 속도 30% 향상)', '버그 수정 및 안정성 개선'].map((item) => (
            <Stack key={item} direction="row" alignItems="center" gap={1}>
              <CheckCircleIcon fontSize="small" color="info" />
              <Typography variant="body2">{item}</Typography>
            </Stack>
          ))}
        </Stack>
      </BaseDialog>

      {/* 경고 모달 */}
      <BaseDialog
        open={warn}
        onClose={() => setWarn(false)}
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            <WarningAmberIcon color="warning" />
            주의
          </Stack>
        }
        actions={
          <>
            <Button onClick={() => setWarn(false)}>나중에</Button>
            <Button variant="contained" color="warning" onClick={() => setWarn(false)}>
              계속 진행
            </Button>
          </>
        }
      >
        <Alert severity="warning" sx={{ mb: 2 }}>
          저장되지 않은 변경사항이 있습니다.
        </Alert>
        <DialogContentText>
          페이지를 벗어나면 작성 중인 내용이 사라집니다. 계속 진행하시겠습니까?
        </DialogContentText>
      </BaseDialog>
    </Box>
  );
}
