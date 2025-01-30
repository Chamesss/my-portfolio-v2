'use client'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'
import SectionDivider from './section-divider'
import SectionHeading from './section-heading'
import VideoSection from './video-section'

export default function About() {
  const { ref } = useSectionInView('About', 0.2)

  return (
    <motion.section
      ref={ref}
      className="mb-28 flex max-w-[45rem] scroll-mt-28 flex-col items-center justify-center text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        My main <b>focus</b> is on making <span className="underline">stunning</span> and{' '}
        <span className="underline">efficient</span> web experiences that users{' '}
        <span className="text-rose-500">
          <b>love</b>
        </span>
        .
      </p>
      <p>
        I'm constantly learning and improving, blending design and tech know-how to create
        innovative solutions. My goal is to craft web applications that look great, work seamlessly,
        and leave a lasting impression on users.
      </p>
      <div>
        <SectionDivider />
      </div>
      <VideoSection />
    </motion.section>
  )
}
