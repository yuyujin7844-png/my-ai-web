import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import GatheringPage from './pages/GatheringPage';
import CreateGatheringPage from './pages/CreateGatheringPage';
import ChatPage from './pages/ChatPage';
import ChatRoomPage from './pages/ChatRoomPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/gathering" element={<GatheringPage />} />
              <Route path="/gathering/create" element={<CreateGatheringPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:id" element={<ChatRoomPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
