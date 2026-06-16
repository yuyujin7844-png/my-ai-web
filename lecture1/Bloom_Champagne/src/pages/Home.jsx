import { useState } from 'react';
import { Box } from '@mui/material';
import { DEEP_NAVY } from '../theme.js';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import HeroSection from '../components/sections/HeroSection.jsx';
import FeaturesGrid from '../components/sections/FeaturesGrid.jsx';
import ProductDetail from '../components/sections/ProductDetail.jsx';
import PairingSection from '../components/sections/PairingSection.jsx';
import ReservationModal from '../components/ui/ReservationModal.jsx';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ background: DEEP_NAVY, minHeight: '100vh' }}>
      <Header />

      {/* 헤더 높이 스페이서 (모바일: 툴바만, 데스크톱: 툴바+네비) */}
      <Box sx={{ height: { xs: 56, md: 112 } }} />

      <HeroSection onReserveClick={() => setModalOpen(true)} />
      <FeaturesGrid />
      <ProductDetail />
      <PairingSection />
      <Footer />

      <ReservationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}
