import About from '@/components/about'
import Contact from '@/components/contact'
import Experience from '@/components/experience'
import Intro from '@/components/intro'
import Projects from '@/components/projects'
import SectionDivider from '@/components/section-divider'
import Skills from '@/components/skills'
import StarField from '@/components/starfield'

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider className="mb-36 mt-24 sm:mb-60 sm:mt-40" />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <StarField />
    </main>
  )
}
