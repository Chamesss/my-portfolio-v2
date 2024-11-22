import clsx from 'clsx'
import React from 'react'
import SectionHeading from './section-heading'
import VideoPlayer from './video-player'

export default function VideoSection({ className = '' }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center p-4', className)}>
      <SectionHeading>Have a quick glance at my work</SectionHeading>
      <p className="mb-8">
        Here’s a glimpse of the many web components I’ve crafted—have a quick glance!
      </p>
      <VideoPlayer src="/web-components.mp4" />
    </div>
  )
}
