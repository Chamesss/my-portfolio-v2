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
      <iframe
        title="vimeo-player"
        src="https://player.vimeo.com/video/1032355275?h=850126fdaa"
        width="640"
        height="360"
        frameBorder={0}
        allowFullScreen
      ></iframe>
      {/* <VideoPlayer src="https://player.vimeo.com/video/1032355275?h=850126fdaa" /> */}
    </div>
  )
}
