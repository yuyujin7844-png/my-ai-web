import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = ['홈', '소개', '서비스', '연락처'];

export default function Section04() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = (item) => {
    alert(`"${item}" 메뉴를 클릭했습니다.`);
  };

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 04 — Navigation
      </Typography>
      <Divider className="section-divider" />

      <Box sx={{ borderRadius: 1, overflow: 'hidden', mt: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My App
            </Typography>

            {/* 데스크탑 메뉴 */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  onClick={() => handleMenuClick(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* 모바일 햄버거 버튼 */}
            <IconButton
              color="inherit"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* 모바일 드로어 */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List sx={{ width: 200 }}>
            {menuItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleMenuClick(item);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        화면을 좁히면 햄버거 메뉴로 전환됩니다. (breakpoint: sm = 600px)
      </Typography>
    </Box>
  );
}
