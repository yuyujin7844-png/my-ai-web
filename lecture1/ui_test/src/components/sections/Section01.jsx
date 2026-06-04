import { Box, Typography, Divider } from '@mui/material';

export default function Section01() {
  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 01 — 제목
      </Typography>
      <Divider className="section-divider" />
      {/* UI 요소를 여기에 추가하세요 */}
      <Typography variant="body1" color="text.secondary">
        첫 번째 섹션입니다.
      </Typography>
    </Box>
  );
}
