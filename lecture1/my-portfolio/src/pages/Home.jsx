import Box from '@mui/material/Box'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import SkillSection from '../sections/SkillSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

// 각 섹션에 id 부여 → HeroSection CTA 스크롤 타겟
export default function Home() {
  return (
    <main>
      <HeroSection />
      <Box id="about">   <AboutSection />   </Box>
      <Box id="skills">  <SkillSection />   </Box>
      <Box id="projects"><ProjectsSection /></Box>
      <Box id="contact"> <ContactSection /> </Box>
    </main>
  )
}
