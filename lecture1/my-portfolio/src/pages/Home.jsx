import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import SkillSection from '../sections/SkillSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
