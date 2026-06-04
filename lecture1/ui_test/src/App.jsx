import { ThemeProvider, CssBaseline, Box, Divider } from '@mui/material';
import theme from './theme';
import './styles/global.css';

import Section01 from './components/sections/Section01';
import Section02 from './components/sections/Section02';
import Section03 from './components/sections/Section03';
import Section04 from './components/sections/Section04';
import Section05 from './components/sections/Section05';
import Section06 from './components/sections/Section06';
import Section07 from './components/sections/Section07';
import Section08 from './components/sections/Section08';
import Section09 from './components/sections/Section09';
import Section10 from './components/sections/Section10';
import Section11 from './components/sections/Section11';
import Section12 from './components/sections/Section12';
import Section13 from './components/sections/Section13';
import Section14 from './components/sections/Section14';
import Section15 from './components/sections/Section15';
import Section16 from './components/sections/Section16';
import Section17 from './components/sections/Section17';
// 섹션을 추가할 때마다 아래에 import 하세요

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Section01 />
        <Divider />
        <Section02 />
        <Divider />
        <Section03 />
        <Divider />
        <Section04 />
        <Divider />
        <Section05 />
        <Divider />
        <Section06 />
        <Divider />
        <Section07 />
        <Divider />
        <Section08 />
        <Divider />
        <Section09 />
        <Divider />
        <Section10 />
        <Divider />
        <Section11 />
        <Divider />
        <Section12 />
        <Divider />
        <Section13 />
        <Divider />
        <Section14 />
        <Divider />
        <Section15 />
        <Divider />
        <Section16 />
        <Divider />
        <Section17 />
        <Divider />
        {/* 섹션을 추가할 때마다 아래에 추가하세요 */}
      </Box>
    </ThemeProvider>
  );
}
