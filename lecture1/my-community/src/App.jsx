import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostDetailPage from './pages/PostDetailPage';
import MyPage from './pages/MyPage';
import EditProfilePage from './pages/EditProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/write" element={<ProtectedRoute><PostWritePage /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
        <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
        <Route path="/mypage/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
