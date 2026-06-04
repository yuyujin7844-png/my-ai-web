import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const fileMenuItems = [
  { label: '편집', icon: <EditIcon fontSize="small" />, color: 'inherit' },
  { label: '복사', icon: <ContentCopyIcon fontSize="small" />, color: 'inherit' },
  { label: '공유', icon: <ShareIcon fontSize="small" />, color: 'inherit' },
  { label: '다운로드', icon: <DownloadIcon fontSize="small" />, color: 'inherit' },
  { label: '북마크', icon: <BookmarkIcon fontSize="small" />, color: 'inherit' },
  { label: '삭제', icon: <DeleteIcon fontSize="small" color="error" />, color: 'error.main' },
];

function MenuCard({ title, triggerLabel, triggerIcon, menuItems, variant = 'outlined' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (label) => {
    setSelected(label);
    handleClose();
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          minHeight: 120,
        }}
      >
        <Button
          variant={variant}
          endIcon={triggerIcon}
          onClick={handleOpen}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {triggerLabel}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            선택된 메뉴:
          </Typography>
          {selected ? (
            <Chip label={selected} size="small" color="primary" />
          ) : (
            <Typography variant="body2" color="text.disabled">
              (없음)
            </Typography>
          )}
        </Box>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { elevation: 3, sx: { minWidth: 180 } } }}
      >
        {menuItems.map((item, index) => (
          <Box key={item.label}>
            {item.divider && <Divider sx={{ my: 0.5 }} />}
            <MenuItem onClick={() => handleSelect(item.label)}>
              {item.icon && (
                <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
              )}
              <ListItemText
                primary={
                  <Typography variant="body2" color={item.color}>
                    {item.label}
                  </Typography>
                }
              />
            </MenuItem>
          </Box>
        ))}
      </Menu>
    </Box>
  );
}

const fileMenuWithDivider = fileMenuItems.map((item, i) =>
  i === fileMenuItems.length - 1 ? { ...item, divider: true } : item
);

const contextMenuItems = [
  { label: '새 탭으로 열기', icon: <ShareIcon fontSize="small" />, color: 'inherit' },
  { label: '링크 복사', icon: <ContentCopyIcon fontSize="small" />, color: 'inherit' },
  { label: '다운로드', icon: <DownloadIcon fontSize="small" />, color: 'inherit' },
  { label: '북마크 추가', icon: <BookmarkIcon fontSize="small" />, color: 'inherit' },
  { label: '편집', icon: <EditIcon fontSize="small" />, color: 'inherit' },
  { label: '삭제', icon: <DeleteIcon fontSize="small" color="error" />, color: 'error.main', divider: true },
];

export default function Section13() {
  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 13 — Menu
      </Typography>
      <Divider className="section-divider" />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MenuCard
            title="기본 드롭다운 메뉴"
            triggerLabel="파일 메뉴"
            triggerIcon={<ArrowDropDownIcon />}
            menuItems={fileMenuWithDivider}
            variant="contained"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MenuCard
            title="컨텍스트 메뉴"
            triggerLabel="더보기"
            triggerIcon={<MoreVertIcon />}
            menuItems={contextMenuItems}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
