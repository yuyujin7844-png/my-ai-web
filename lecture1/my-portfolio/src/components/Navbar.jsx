import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'

const NAV_ITEMS = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isMobile = useMediaQuery('(max-width:768px)')
  const [anchorEl, setAnchorEl] = useState(null)

  const currentTab = NAV_ITEMS.findIndex(item => item.path === pathname)

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#F2EDE8',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          PORTFOLIO
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={e => setAnchorEl(e.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{ sx: { bgcolor: '#1C0A14', color: '#F2EDE8' } }}
            >
              {NAV_ITEMS.map(item => (
                <MenuItem
                  key={item.path}
                  onClick={() => { navigate(item.path); setAnchorEl(null) }}
                  sx={{
                    color: pathname === item.path ? '#B5253E' : '#F2EDE8',
                    fontWeight: pathname === item.path ? 700 : 400,
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box>
            <Tabs
              value={currentTab === -1 ? 0 : currentTab}
              onChange={(_, idx) => navigate(NAV_ITEMS[idx].path)}
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: '#8B1A2F', height: 3 } }}
            >
              {NAV_ITEMS.map(item => (
                <Tab
                  key={item.path}
                  label={item.label}
                  sx={{
                    color: '#F2EDE8',
                    opacity: 0.7,
                    fontWeight: 500,
                    '&.Mui-selected': { opacity: 1, color: '#F2EDE8', fontWeight: 700 },
                  }}
                />
              ))}
            </Tabs>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
