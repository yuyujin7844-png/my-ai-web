import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BestPage from './pages/BestPage.jsx';
import NewPage from './pages/NewPage.jsx';
import AccessoriesPage from './pages/AccessoriesPage.jsx';
import SalePage from './pages/SalePage.jsx';

export default function App() {
  return (
    <BrowserRouter basename="/my-ai-web/Bloom_Champagne">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/best" element={<BestPage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/sale" element={<SalePage />} />
      </Routes>
    </BrowserRouter>
  );
}
