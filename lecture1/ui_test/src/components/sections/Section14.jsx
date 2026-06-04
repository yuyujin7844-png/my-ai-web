import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Chip,
  Avatar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ArticleIcon from '@mui/icons-material/Article';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const navItems = [
  { label: '홈', icon: <HomeIcon />, desc: '메인 페이지' },
  { label: '소개', icon: <InfoIcon />, desc: '회사 소개' },
  { label: '서비스', icon: <BuildIcon />, desc: '제공 서비스' },
  { label: '블로그', icon: <ArticleIcon />, desc: '최신 글' },
  { label: '연락처', icon: <ContactMailIcon />, desc: '문의하기' },
  { label: '설정', icon: <SettingsIcon />, desc: '환경 설정' },
];

function SidebarDrawer({ open, onClose, anchor, selected, onSelect }) {
  const isLeft = anchor === 'left';

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 260 } } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 헤더 */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: '0.8rem' }}>
              M
            </Avatar>
            <Typography variant="subtitle1" fontWeight={700}>
              My App
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        {/* 네비게이션 리스트 */}
        <List sx={{ flexGrow: 1, pt: 1 }}>
          {navItems.map((item) => {
            const isSelected = selected === item.label;
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    onSelect(item.label);
                    onClose();
                  }}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.desc}
                    slotProps={{
                      primary: { variant: 'body2', fontWeight: isSelected ? 700 : 400 },
                      secondary: { variant: 'caption' },
                    }}
                  />
                  {isSelected && <Chip label="현재" size="small" color="primary" sx={{ ml: 1 }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* 푸터 */}
        <Divider />
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            {isLeft ? '← 왼쪽 사이드바' : '오른쪽 사이드바 →'}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default function Section14() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [selected, setSelected] = useState('홈');

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 14 — Sidebar
      </Typography>
      <Divider className="section-divider" />

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<MenuOpenIcon />}
          onClick={() => setLeftOpen(true)}
        >
          왼쪽 사이드바
        </Button>
        <Button
          variant="outlined"
          endIcon={<MenuOpenIcon sx={{ transform: 'scaleX(-1)' }} />}
          onClick={() => setRightOpen(true)}
        >
          오른쪽 사이드바
        </Button>
      </Stack>

      <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, display: 'inline-flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">현재 선택된 메뉴:</Typography>
        <Chip label={selected} color="primary" size="small" />
      </Box>

      <SidebarDrawer
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        anchor="left"
        selected={selected}
        onSelect={setSelected}
      />
      <SidebarDrawer
        open={rightOpen}
        onClose={() => setRightOpen(false)}
        anchor="right"
        selected={selected}
        onSelect={setSelected}
      />
    </Box>
  );
}
