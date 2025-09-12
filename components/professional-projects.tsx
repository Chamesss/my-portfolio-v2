'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './section-heading'
import { useSectionInView } from '@/lib/hooks'
import SingleItemCarousel from './carousel'
import { professionalProjectsData } from '@/lib/data'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export default function ProfessionalProjectShowcase() {
  const [currentProject, setCurrentProject] = useState(0)
  const [current, setCurrent] = useState(0)
  const { ref } = useSectionInView('professional-projects', 0.3)

  const { ref: animationRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const project = professionalProjectsData[currentProject]

  const changeProject = (projectIndex: number) => {
    if (projectIndex === currentProject) return
    setCurrentProject(projectIndex)
    setCurrent(0)
  }

  useEffect(() => {
    setCurrent(0)
  }, [currentProject])

  const projectSlideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  }

  return (
    <motion.section
      ref={(node) => {
        ref(node)
        animationRef(node)
      }}
      className="mb-28 w-full max-w-[50rem] scroll-mt-28 text-center"
      id="professional-projects"
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <SectionHeading>Professional Projects</SectionHeading>
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative flex rounded-full bg-gray-200/80 p-1 backdrop-blur-sm dark:bg-white/10">
          <motion.div
            className="absolute inset-y-1 rounded-full bg-white shadow-sm dark:bg-gray-800"
            initial={false}
            animate={{
              x: currentProject * 96 + 4,
              width: 88
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          />
          {professionalProjectsData.map((proj, index) => (
            <motion.button
              key={proj.id}
              onClick={() => changeProject(index)}
              className={`relative z-10 flex h-10 w-24 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentProject === index
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-white/60 dark:hover:text-white/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex flex-row items-center gap-0.5 sm:gap-1.5">
                <Image
                  width={20}
                  height={20}
                  src={proj.logo}
                  alt={`${proj.header} logo`}
                  className="mr-2 h-5 w-5 rounded-full object-contain"
                />
                <span>{proj.header}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="relative w-full overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="relative overflow-hidden">
          <motion.div
            key={currentProject}
            variants={projectSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:gap-6 md:p-8">
              <motion.div
                className="flex flex-col justify-center"
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                <motion.h2
                  className="mb-4 flex flex-row items-center gap-3 text-left text-2xl font-semibold text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  key={`title-${currentProject}`}
                >
                  <Image
                    src={project.logo}
                    width={30}
                    height={30}
                    alt={`${project.header} logo`}
                    className="mb-1 mr-2 inline h-10 w-10 rounded-full object-contain"
                  />
                  <span>{project.title}</span>
                </motion.h2>
                {project.description.map((paragraph, index) => (
                  <motion.p
                    key={`desc-${currentProject}-${index}`}
                    className="mb-4 text-left text-sm leading-relaxed text-gray-700 dark:text-white/80 sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
                <div className="mb-6 flex gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 sm:text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit website
                      <ExternalLink className="mb-0.5 ml-2 inline-block h-4 w-4 transition-all group-hover:translate-x-1" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
              <SingleItemCarousel
                images={project.images}
                setCurrent={setCurrent}
                current={current}
                inView={inView}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
