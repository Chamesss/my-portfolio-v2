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
      <div className="relative w-full pb-[56.25%]">
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/1032355275?h=850126fdaa"
          frameBorder={0}
          allowFullScreen
          className="absolute left-0 top-0 h-full w-full"
        />
      </div>
      {/* <VideoPlayer src="https://player.vimeo.com/video/1032355275?h=850126fdaa" /> */}
    </div>
  )
}
