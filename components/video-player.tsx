'use client'
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  let controlsTimeout: NodeJS.Timeout

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }, [videoRef.current?.duration])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value
    }
    setIsMuted(value === 0)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimeout)
    controlsTimeout = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 2000)
  }

  return (
    <div
      ref={containerRef}
      className="group relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="h-full w-full"
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <div
          className="mb-4 h-1 w-full cursor-pointer rounded-full bg-gray-600"
          onClick={handleProgressClick}
        >
          <div
            className="relative h-full rounded-full bg-blue-500"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 h-3 w-3 translate-y-[-50%] transform rounded-full bg-blue-500 shadow-lg"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={handlePlayPause}
              className="text-white transition-colors hover:text-blue-500"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <Play className="h-4 w-4 md:h-6 md:w-6" />
              )}
            </button>

            <button
              onClick={() => skip(-10)}
              className="text-white transition-colors hover:text-blue-500"
            >
              <SkipBack className="h-4 w-4 md:h-6 md:w-6" />
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white transition-colors hover:text-blue-500"
            >
              <SkipForward className="h-4 w-4 md:h-6 md:w-6" />
            </button>

            <div className="flex items-center space-x-1 md:space-x-2">
              <button
                onClick={toggleMute}
                className="text-white transition-colors hover:text-blue-500"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 md:h-6 md:w-6" />
                ) : (
                  <Volume2 className="h-4 w-4 md:h-6 md:w-6" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-10 accent-blue-500 md:w-20"
              />
            </div>

            <span className="text-nowrap text-xs text-white md:text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFullscreen}
              className="text-white transition-colors hover:text-blue-500"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <Maximize className="h-4 w-4 md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
