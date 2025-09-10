'use client'

import { projectsData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import React from 'react'
import Project from './project'
import SectionHeading from './section-heading'

export default function Projects() {
  const { ref } = useSectionInView('Projects', 0.3)
  return (
    <section ref={ref} className="mb-28 scroll-mt-28" id="projects">
      <SectionHeading>Personal Projects</SectionHeading>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {projectsData.map((project, i) => (
          <Project key={i} {...project} />
        ))}
      </div>
    </section>
  )
}
