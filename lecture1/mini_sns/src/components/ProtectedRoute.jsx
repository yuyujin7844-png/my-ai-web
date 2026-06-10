import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#F5ECD7' }}>
        <CircularProgress sx={{ color: '#8B6347' }} />
      </Box>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
