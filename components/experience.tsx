'use client'

import { useTheme } from '@/context/theme-context'
import { experiencesData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import SectionHeading from './section-heading'

export default function Experience() {
  const { ref } = useSectionInView('Experience', 0.3)
  const { theme } = useTheme()

  return (
    <section id="experience" ref={ref} className="mb-28 scroll-mt-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background: theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem'
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background: theme === 'light' ? 'white' : 'rgba(255, 255, 255, 0.15)',
                fontSize: '1.5rem'
              }}
              visible={true}
              contentArrowStyle={{
                borderRight:
                  theme === 'light'
                    ? '0.4rem solid #9ca3af'
                    : '0.4rem solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <h3 className="!font-semibold capitalize">{item.title}</h3>
              <small className="my-1 !mt-0 !font-normal !italic">{item.location}</small>
              <div>
                <p className="!mt-2 !font-normal text-gray-700 dark:text-white/75">
                  {item.description}
                </p>
                {/*@ts-ignore */}
                {item.projects && item.projects.length > 0 && (
                  <div className="mt-2">
                    <h4 className="!mt-2 !font-semibold">Projects:</h4>
                    <ul className="!ml-4 !mt-1">
                      {/*@ts-ignore */}
                      {item.projects.map((project, i) => (
                        <li key={i} className="mt-4 flex flex-col gap-1">
                          <h2 className="font-semibold text-black text-opacity-90 dark:text-white">
                            {project.projectName}
                          </h2>
                          <small className="!font-normal italic text-gray-700 dark:text-white/75">
                            {project.projectDescription}
                          </small>
                          <a
                            href={project.link}
                            target="_blank"
                            className="font-semibold !text-blue-500 hover:!underline dark:!text-blue-400"
                          >
                            {project.link}
                          </a>
                          <ul className="!mt-1 flex w-full flex-row flex-wrap gap-1.5 px-2">
                            {/*@ts-ignore */}
                            {project.projectTechStack.map((tech, j) => (
                              <li
                                key={j}
                                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/80"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  )
}
