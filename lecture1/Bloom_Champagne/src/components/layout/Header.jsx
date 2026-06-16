import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Typography,
  useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { CHAMPAGNE_GOLD, DEEP_NAVY } from '../../theme.js';

const NAV_ITEMS = [
  { label: '베스트', to: '/best' },
  { label: '신상', to: '/new' },
  { label: '소품', to: '/accessories' },
  { label: '특가할인', to: '/sale' },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* 헤더 */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(5, 10, 28, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid rgba(212, 175, 55, 0.15)`,
          zIndex: 1300,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 6 },
            minHeight: { xs: 56, md: 64 },
          }}
        >
          {/* 로고 */}
          <Box
            component={Link}
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: CHAMPAGNE_GOLD,
                textTransform: 'uppercase',
              }}
            >
              Bloom
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '0.6rem', md: '0.7rem' },
                fontWeight: 400,
                letterSpacing: '0.35em',
                color: '#ffffff99',
                textTransform: 'uppercase',
                mt: '-2px',
              }}
            >
              Champagne
            </Typography>
          </Box>

          {/* 우측: 로그인 + 메뉴 아이콘 (모바일) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: `${CHAMPAGNE_GOLD}66`,
                color: CHAMPAGNE_GOLD,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                px: 2,
                py: 0.6,
                minHeight: 36,
                '&:hover': { borderColor: CHAMPAGNE_GOLD },
              }}
            >
              로그인
            </Button>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fff', ml: 0.5 }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* 네비게이션 바 (데스크톱) */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 5,
              py: 1,
              borderTop: `1px solid rgba(212,175,55,0.1)`,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                sx={{
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  px: 1,
                  py: 0.5,
                  minHeight: 'auto',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: '1px',
                    backgroundColor: CHAMPAGNE_GOLD,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    color: CHAMPAGNE_GOLD,
                    background: 'none',
                    '&::after': { width: '100%' },
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>

      {/* 모바일 드로어 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            background: DEEP_NAVY,
            borderLeft: `1px solid ${CHAMPAGNE_GOLD}33`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 4,
                  py: 2,
                  '&:hover': { backgroundColor: `${CHAMPAGNE_GOLD}11` },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color: '#ffffff',
                      letterSpacing: '0.2em',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
