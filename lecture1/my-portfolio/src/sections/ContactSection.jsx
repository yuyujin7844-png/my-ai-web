import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

export default function ContactSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#1C0A14',
        color: '#F2EDE8',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: '#B5253E', letterSpacing: 4, fontSize: '0.8rem', mb: 1, display: 'block' }}
        >
          CONTACT
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, color: '#F2EDE8', mb: 2 }}
        >
          여기는 Contact 섹션입니다.
        </Typography>

        <Divider sx={{ width: 60, height: 3, bgcolor: '#8B1A2F', mx: 'auto', my: 3, border: 'none' }} />

        <Typography variant="body1" sx={{ color: '#C4B8B0', mb: 6 }}>
          연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="이름"
              variant="outlined"
              placeholder="홍길동"
              InputLabelProps={{ style: { color: '#8A7E78' } }}
              InputProps={{
                style: { color: '#F2EDE8', borderColor: '#3D2B35' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#3D2B35' },
                  '&:hover fieldset': { borderColor: '#8B1A2F' },
                  '&.Mui-focused fieldset': { borderColor: '#8B1A2F' },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              placeholder="email@example.com"
              InputLabelProps={{ style: { color: '#8A7E78' } }}
              InputProps={{ style: { color: '#F2EDE8' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#3D2B35' },
                  '&:hover fieldset': { borderColor: '#8B1A2F' },
                  '&.Mui-focused fieldset': { borderColor: '#8B1A2F' },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="메시지"
              variant="outlined"
              placeholder="안녕하세요, 연락드립니다..."
              InputLabelProps={{ style: { color: '#8A7E78' } }}
              InputProps={{ style: { color: '#F2EDE8' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#3D2B35' },
                  '&:hover fieldset': { borderColor: '#8B1A2F' },
                  '&.Mui-focused fieldset': { borderColor: '#8B1A2F' },
                },
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#8B1A2F',
            color: '#F7F3EF',
            px: 6,
            py: 1.5,
            fontWeight: 600,
            mb: 6,
            '&:hover': { bgcolor: '#6B1D35' },
          }}
        >
          메시지 보내기
        </Button>

        <Box sx={{ borderTop: '1px solid #3D2B35', pt: 4 }}>
          <Typography variant="body2" sx={{ color: '#8A7E78' }}>
            © 2026 My Portfolio. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
