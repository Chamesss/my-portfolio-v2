'use client'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { TypeAnimation } from 'react-type-animation'

export default function Intro() {
  const { ref } = useSectionInView('Home', 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()
  const [terminated, setTerminated] = useState(false)
  return (
    <section
      ref={ref}
      id="home"
      className="mb-2 flex w-full max-w-[50rem] scroll-mt-96 flex-col items-center justify-center text-center sm:mb-0"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2
            }}
            className="relative"
          >
            <Image
              src={'/mypicture.png'}
              alt="profile-picture"
              width={640}
              height={640}
              quality={95}
              priority={true}
              className="relative h-[10rem] w-[10rem] rounded-full border-[0.1rem] object-cover shadow-xl"
            />
          </motion.div>
          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7
            }}
          >
            👋
          </motion.span>
        </div>
      </div>
      <motion.span
        className="mt-8 flex min-h-[12rem] max-w-[50rem] flex-col items-center justify-start px-4 text-lg font-medium !leading-[1.5] text-black dark:text-white sm:mb-10 sm:min-h-[14rem] sm:text-2xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TypeAnimation
          sequence={[
            "Hello, I'm Chamsedin Azouz, a passionate full stack developer ready to innovate and create.",
            1000,
            () => setTerminated(true)
          ]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            display: 'block'
          }}
        />
        {terminated && (
          <TypeAnimation
            sequence={[
              "I'm a versatile full stack developer. I craft dynamic web solutions.",
              2000,
              "Building web applications is not just my job; it's my craft. Let's create something extraordinary together.",
              2000,
              () => setTerminated(true)
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{
              display: 'block'
            }}
          />
        )}
      </motion.span>
      <motion.div
        className="flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2
        }}
      >
        <Link
          className="group flex items-center gap-2 text-nowrap rounded-full bg-gray-950/50 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
          href="#contact"
          onClick={() => {
            setActiveSection('Contact')
            setTimeOfLastClick(Date.now())
          }}
        >
          Contact me here{' '}
          <BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
        </Link>
        <a
          className="hover:backdrop-brightness-80 group flex cursor-pointer items-center gap-2 text-nowrap rounded-full border border-black/10 bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/80"
          href="/cv.pdf"
          download
        >
          Download CV{' '}
          <HiDownload className="opacity-60 transition group-hover:translate-y-1 dark:opacity-80" />
        </a>
        <a
          className="hover:backdrop-brightness-80 group flex cursor-pointer items-center gap-2 text-nowrap rounded-full border border-black/10 bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/80"
          href="/skill_sheet.pdf"
          download
        >
          Skill Sheet{' '}
          <HiDownload className="opacity-60 transition group-hover:translate-y-1 dark:opacity-80" />
        </a>
        <a
          href="https://www.linkedin.com/in/chamsedin-azouz-613a77245/"
          target="_blank"
          className="flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white p-4 text-gray-700 outline-none transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/80"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://github.com/Chamesss"
          target="_blank"
          className="flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white p-4 text-[1.20rem] text-gray-700 outline-none transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/80"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  )
}
