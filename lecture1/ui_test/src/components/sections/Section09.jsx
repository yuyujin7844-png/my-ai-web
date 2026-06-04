import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

const cards = [
  {
    id: 1,
    title: 'React',
    description: 'Meta가 만든 UI 라이브러리. 컴포넌트 기반으로 재사용 가능한 UI를 구성합니다.',
    color: '#61dafb',
    tag: 'Frontend',
  },
  {
    id: 2,
    title: 'TypeScript',
    description: 'JavaScript에 정적 타입을 추가한 언어. 대규모 프로젝트의 안정성을 높입니다.',
    color: '#3178c6',
    tag: 'Language',
  },
  {
    id: 3,
    title: 'Node.js',
    description: 'V8 엔진 기반의 서버 사이드 JavaScript 런타임. 빠른 비동기 처리가 강점입니다.',
    color: '#68a063',
    tag: 'Backend',
  },
  {
    id: 4,
    title: 'Vite',
    description: '차세대 프론트엔드 빌드 도구. 빠른 HMR과 번들링 속도를 제공합니다.',
    color: '#9333ea',
    tag: 'Tooling',
  },
];

function TechCard({ card }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      elevation={hovered ? 8 : 2}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'elevation 0.2s, transform 0.2s, box-shadow 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: 120,
          bgcolor: card.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={700} color="white">
          {card.title[0]}
        </Typography>
      </CardMedia>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {card.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {card.tag}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" variant="contained" onClick={() => alert(`${card.title} 더 알아보기`)}>
          더 알아보기
        </Button>
        <Button size="small" onClick={() => alert(`${card.title} 공유하기`)}>
          공유
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Section09() {
  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 09 — Card
      </Typography>
      <Divider className="section-divider" />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <TechCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
