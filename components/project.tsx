'use client'
import { projectsData } from '@/lib/data'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'
import { TbExternalLink } from 'react-icons/tb'

type Props = (typeof projectsData)[number]

export default function Project({ title, description, tags, imageUrl, sourceCode }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1']
  })
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <section className="relative max-w-[42rem] overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 sm:h-[20rem] sm:pr-2 sm:group-even:pl-8 xl:group-even:pl-0">
        <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:ml-[1rem] sm:max-w-[55%] sm:pl-5 sm:pr-5 sm:pt-9 sm:group-even:ml-[17rem] sm:group-even:max-w-[60%] sm:group-even:pl-10 xl:group-even:ml-[1rem] xl:group-even:max-w-[55%] xl:group-even:pl-5">
          <div className="mb-2 flex w-full flex-row items-center justify-between">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <a
              href={sourceCode}
              target="_blank"
              className="group flex items-center justify-start gap-2 rounded-full bg-gray-900 px-[0.75rem] py-[0.3rem] text-sm text-white outline-none transition hover:scale-105 hover:bg-gray-950 focus:scale-110 active:scale-[1.02]"
            >
              <small className="flex flex-row items-center justify-center gap-2 text-nowrap">
                Source code
                <TbExternalLink />
              </small>
            </a>
          </div>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/80">{description}</p>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {tags.map((tag, i) => (
              <li
                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/80"
                key={i}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <Image
          className="group-even:-right-[initial] absolute -right-40 top-8 hidden w-[28.25rem] rounded-t-lg shadow-2xl transition group-even:-left-40 group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-105 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 sm:block xl:group-even:-right-40 xl:group-even:left-auto xl:group-even:group-hover:translate-y-3 xl:group-even:group-hover:-rotate-2"
          src={imageUrl}
          alt={title}
          width={640}
          height={640}
          quality={95}
        />
      </section>
    </motion.div>
  )
}
