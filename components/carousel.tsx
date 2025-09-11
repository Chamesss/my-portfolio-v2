'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import type React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { useState, useEffect } from 'react'

interface Props {
  images: StaticImageData[] | string[]
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  current: number
  inView: boolean
  maxHeight?: number
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait'
}

export default function SingleItemCarousel({
  images,
  setCurrent,
  current,
  inView,
  maxHeight = 500,
  aspectRatio = 'auto'
}: Props) {
  const [imageHeights, setImageHeights] = useState<number[]>([])
  const [containerHeight, setContainerHeight] = useState(maxHeight)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goToSlide = (index: number) => setCurrent(index)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length)

  const openFullscreen = () => setIsFullscreen(true)
  const closeFullscreen = () => setIsFullscreen(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        closeFullscreen()
      }
      if (isFullscreen) {
        if (event.key === 'ArrowLeft') {
          prevSlide()
        } else if (event.key === 'ArrowRight') {
          nextSlide()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen])

  useEffect(() => {
    if (isFullscreen) {
      // Disable scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scroll
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const getContainerHeight = () => {
    if (aspectRatio === 'square') return 384
    if (aspectRatio === 'video') return 216 // 16:9 for 384px width
    if (aspectRatio === 'portrait') return 512 // 3:4 for 384px width
    if (aspectRatio === 'auto' && imageHeights[current]) {
      return Math.min(imageHeights[current], maxHeight)
    }
    return maxHeight
  }

  useEffect(() => {
    setContainerHeight(getContainerHeight())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, imageHeights, aspectRatio, maxHeight])

  const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio !== 'auto') return

    const img = event.currentTarget
    const containerWidth = 384 // max-w-sm is 384px
    const imgAspectRatio = img.naturalHeight / img.naturalWidth
    const calculatedHeight = containerWidth * imgAspectRatio

    setImageHeights((prev) => {
      const newHeights = [...prev]
      newHeights[index] = calculatedHeight
      return newHeights
    })
  }

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ x: 30, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="relative w-full max-w-2xl">
          <motion.div
            className="relative min-h-[320px] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
            animate={{ height: containerHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="relative h-full w-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                    index === current
                      ? 'translate-x-0'
                      : index < current
                        ? '-translate-x-full'
                        : 'translate-x-full'
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center p-2">
                    <div className="group relative cursor-pointer" onClick={openFullscreen}>
                      <Image
                        src={image || '/placeholder.svg'}
                        width={800}
                        height={600}
                        alt={`Image ${index + 1}`}
                        className="max-h-[480px] max-w-full rounded-lg object-contain"
                        priority={index === current}
                        onLoad={(e) => handleImageLoad(index, e)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-6 w-6 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95 dark:bg-gray-900/90 dark:hover:bg-gray-900"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-white" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95 dark:bg-gray-900/90 dark:hover:bg-gray-900"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-white" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="mt-4 flex space-x-1.5">
          {images.map((image, i) => (
            <motion.button
              key={`indicator-${i}`}
              onClick={() => goToSlide(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'scale-125 bg-gray-800 dark:bg-white'
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-white/30 dark:hover:bg-white/50'
              }`}
              whileHover={{ scale: i === current ? 1.25 : 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFullscreen}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`duration-400 absolute inset-0 flex items-center justify-center transition-transform ease-in-out ${
                      index === current
                        ? 'translate-x-0'
                        : index < current
                          ? '-translate-x-full'
                          : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      width={1920}
                      height={1080}
                      alt={`Image ${index + 1} - Fullscreen`}
                      className="max-h-[90vh] max-w-[90vw] object-contain"
                      priority={Math.abs(index - current) <= 1}
                    />
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={closeFullscreen}
              className="z-60 absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-all hover:bg-neutral-800/80"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6 text-white transition-all group-hover:scale-105 group-active:scale-95" />
            </motion.button>

            {/* Fullscreen navigation */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              className="z-60 group absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800 transition-all hover:bg-neutral-800/80"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white transition-all group-hover:scale-105 group-active:scale-95" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              className="z-60 absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800 transition-all hover:bg-neutral-800/80"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white transition-all group-hover:scale-105 group-active:scale-95" />
            </motion.button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm text-white">
                {current + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
