import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import { PortfolioProvider } from './context/PortfolioContext'

function App() {
  return (
    <PortfolioProvider>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />}     />
        <Route path="/about"   element={<AboutMe />}  />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </PortfolioProvider>
  )
}

export default App
