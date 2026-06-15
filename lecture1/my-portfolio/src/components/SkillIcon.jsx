import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SiFigma } from 'react-icons/si'

const ABBR = { Photoshop: 'Ps', Illustrator: 'Ai' }

export default function SkillIcon({ name, color, size = 20 }) {
  if (name === 'Figma') {
    return <SiFigma size={size} color={color} />
  }
  const abbr = ABBR[name] ?? name.slice(0, 2)
  return (
    <Box
      sx={{
        width: size, height: size,
        bgcolor: color,
        borderRadius: `${Math.round(size * 0.2)}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          color: '#fff',
          fontSize: size * 0.38,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.5px',
        }}
      >
        {abbr}
      </Typography>
    </Box>
  )
}
