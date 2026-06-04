import { useState, useRef } from 'react';
import { Box, Typography, Divider, Paper, Chip, Grid } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const initialItems = [
  { id: 1, label: 'React', color: '#61dafb' },
  { id: 2, label: 'TypeScript', color: '#3178c6' },
  { id: 3, label: 'Node.js', color: '#68a063' },
  { id: 4, label: 'Vite', color: '#9333ea' },
  { id: 5, label: 'MUI', color: '#0081cb' },
];

export default function Section10() {
  const [source, setSource] = useState(initialItems);
  const [dropped, setDropped] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [overZone, setOverZone] = useState(null); // 'source' | 'drop' | null
  const dragMeta = useRef(null); // { id, from }

  const handleDragStart = (id, from) => {
    setDraggingId(id);
    dragMeta.current = { id, from };
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverZone(null);
    dragMeta.current = null;
  };

  const moveItem = (toZone) => {
    const { id, from } = dragMeta.current;
    if (from === toZone) return;

    const fromList = from === 'source' ? source : dropped;
    const toList = toZone === 'source' ? source : dropped;
    const item = fromList.find((i) => i.id === id);

    if (from === 'source') {
      setSource((prev) => prev.filter((i) => i.id !== id));
      setDropped((prev) => [...prev, item]);
    } else {
      setDropped((prev) => prev.filter((i) => i.id !== id));
      setSource((prev) => [...prev, item]);
    }
  };

  const makeDragHandlers = (zone) => ({
    onDragOver: (e) => {
      e.preventDefault();
      setOverZone(zone);
    },
    onDragLeave: () => setOverZone(null),
    onDrop: (e) => {
      e.preventDefault();
      if (dragMeta.current) moveItem(zone);
      setOverZone(null);
    },
  });

  const zoneStyle = (zone) => ({
    minHeight: 200,
    p: 2,
    borderRadius: 2,
    border: '2px dashed',
    borderColor: overZone === zone ? 'primary.main' : 'divider',
    bgcolor: overZone === zone ? 'action.focus' : 'background.paper',
    transition: 'border-color 0.2s, background-color 0.2s',
  });

  const renderItem = (item, from) => (
    <Box
      key={item.id}
      draggable
      onDragStart={() => handleDragStart(item.id, from)}
      onDragEnd={handleDragEnd}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        mb: 1,
        borderRadius: 1,
        bgcolor: 'grey.100',
        opacity: draggingId === item.id ? 0.3 : 1,
        cursor: 'grab',
        userSelect: 'none',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { bgcolor: 'grey.200' },
        '&:active': { cursor: 'grabbing' },
        transition: 'opacity 0.2s',
      }}
    >
      <DragIndicatorIcon fontSize="small" sx={{ color: 'text.disabled' }} />
      <Box
        sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color, flexShrink: 0 }}
      />
      <Typography variant="body2" fontWeight={500}>
        {item.label}
      </Typography>
    </Box>
  );

  return (
    <Box className="section-wrapper">
      <Typography variant="h2" gutterBottom>
        Section 10 — Drag & Drop
      </Typography>
      <Divider className="section-divider" />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        아이템을 드래그하여 오른쪽 드롭 영역으로 이동하거나 다시 왼쪽으로 되돌릴 수 있습니다.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            아이템 목록{' '}
            <Chip label={source.length} size="small" />
          </Typography>
          <Paper variant="outlined" sx={zoneStyle('source')} {...makeDragHandlers('source')}>
            {source.length === 0 ? (
              <Typography variant="body2" color="text.disabled" textAlign="center" sx={{ mt: 4 }}>
                모든 아이템이 이동되었습니다
              </Typography>
            ) : (
              source.map((item) => renderItem(item, 'source'))
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            드롭 영역{' '}
            <Chip label={dropped.length} size="small" color="primary" />
          </Typography>
          <Paper variant="outlined" sx={zoneStyle('drop')} {...makeDragHandlers('drop')}>
            {dropped.length === 0 ? (
              <Typography variant="body2" color="text.disabled" textAlign="center" sx={{ mt: 4 }}>
                여기에 드롭하세요
              </Typography>
            ) : (
              dropped.map((item) => renderItem(item, 'drop'))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
