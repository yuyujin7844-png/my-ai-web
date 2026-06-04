import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Fab,
  Zoom,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SCROLL_THRESHOLD = 100;

const newsItems = [
  { id: 1, category: '기술', title: 'React 19 정식 출시', desc: '새로운 훅과 서버 컴포넌트가 안정화되었습니다.' },
  { id: 2, category: 'AI', title: 'GPT-5 발표', desc: '더욱 강력한 추론 능력과 멀티모달 기능을 지원합니다.' },
  { id: 3, category: '보안', title: '오픈소스 취약점 패치', desc: '주요 npm 패키지에서 발견된 취약점이 수정되었습니다.' },
  { id: 4, category: '기술', title: 'Vite 6.0 출시', desc: '빌드 속도가 2배 향상되고 플러그인 API가 개선되었습니다.' },
  { id: 5, category: '클라우드', title: 'AWS 신규 리전 오픈', desc: '서울 리전에 새로운 가용 영역이 추가되었습니다.' },
  { id: 6, category: '기술', title: 'TypeScript 6.0 베타', desc: '향상된 타입 추론과 새로운 유틸리티 타입이 포함됩니다.' },
  { id: 7, category: 'AI', title: '오픈소스 LLM 급성장', desc: '로컬에서 실행 가능한 고성능 모델이 다수 공개되었습니다.' },
  { id: 8, category: '기술', title: 'Node.js 24 LTS 지정', desc: '새로운 장기 지원 버전이 지정되어 안정적인 운영이 가능합니다.' },
  { id: 9, category: '보안', title: 'HTTPS 전면 의무화', desc: '주요 브라우저에서 HTTP 접속을 완전히 차단할 예정입니다.' },
  { id: 10, category: '기술', title: 'CSS Anchor Positioning', desc: '브라우저 네이티브 앵커 포지셔닝이 전 브라우저 지원됩니다.' },
  { id: 11, category: '클라우드', title: 'Vercel Edge Runtime 업데이트', desc: '콜드 스타트 없는 엣지 함수 실행이 더욱 빨라졌습니다.' },
  { id: 12, category: 'AI', title: '코드 자동 완성 도구 비교', desc: 'Copilot, Cursor, Codeium 세 도구의 성능을 비교 분석했습니다.' },
];

const categoryColor = {
  기술: '#1976d2',
  AI: '#9c27b0',
  보안: '#d32f2f',
  클라우드: '#0288d1',
};

export default function Section11() {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    setScrollTop(containerRef.current?.scrollTop ?? 0);
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showFab = scrollTop > SCROLL_THRESHOLD;

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 11 — Scroll
      </Typography>
      <Divider className="section-divider" />

      <Box sx={{ position: 'relative', mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            최신 기술 뉴스
          </Typography>
          <Typography variant="body2" color="text.secondary">
            스크롤 위치: {scrollTop}px
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          ref={containerRef}
          onScroll={handleScroll}
          sx={{
            height: 300,
            overflowY: 'auto',
            borderRadius: 2,
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-track': { bgcolor: 'grey.100' },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 3 },
          }}
        >
          <List disablePadding>
            {newsItems.map((item, index) => (
              <Box key={item.id}>
                <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: categoryColor[item.category],
                        fontSize: '0.7rem',
                        fontWeight: 700,
                      }}
                    >
                      {item.category}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {item.title}
                      </Typography>
                    }
                    secondary={item.desc}
                  />
                </ListItem>
                {index < newsItems.length - 1 && <Divider variant="inset" component="li" />}
              </Box>
            ))}
          </List>
        </Paper>

        <Zoom in={showFab}>
          <Fab
            size="small"
            color="primary"
            onClick={scrollToTop}
            sx={{ position: 'absolute', bottom: 12, right: 12 }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {SCROLL_THRESHOLD}px 이상 스크롤하면 Top 버튼이 나타납니다.
      </Typography>
    </Box>
  );
}
