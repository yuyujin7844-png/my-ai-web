import { Box } from '@mui/material';
import { useInView } from '../../hooks/useInView.js';

export default function FadeSlide({ children, delay = 0, sx }) {
  const { ref, inView } = useInView(0.12);
  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(38px)',
        transition: `opacity 0.75s cubic-bezier(0.215,0.61,0.355,1) ${delay}s, transform 0.75s cubic-bezier(0.215,0.61,0.355,1) ${delay}s`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
