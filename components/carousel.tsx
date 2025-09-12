'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'
import type React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  images: StaticImageData[] | string[]
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  current: number
  inView: boolean
  maxHeight?: number
  minHeight?: number
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait'
  adaptiveHeight?: boolean // Enable/disable dynamic height adaptation
  animateHeight?: boolean // Enable/disable height transition animation
}

export default function SingleItemCarousel({
  images,
  setCurrent,
  current,
  inView,
  maxHeight = 500,
  minHeight,
  aspectRatio = 'auto',
  adaptiveHeight = true,
  animateHeight = false
}: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageHeights, setImageHeights] = useState<number[]>([])
  const [containerHeight, setContainerHeight] = useState<number>(() => {
    const initialIsMobile = typeof window !== 'undefined' && window.innerWidth < 768
    return initialIsMobile ? 280 : 350
  })
  const swiperRef = useRef<SwiperType>()
  const fullscreenSwiperRef = useRef<SwiperType>()

  const openFullscreen = () => setIsFullscreen(true)
  const closeFullscreen = () => setIsFullscreen(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Sync external current state with Swiper
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== current)
      swiperRef.current.slideTo(current)
  }, [current])

  // Sync fullscreen swiper when opened
  useEffect(() => {
    if (isFullscreen && fullscreenSwiperRef.current) fullscreenSwiperRef.current.slideTo(current, 0)
  }, [isFullscreen, current])

  // Handle keyboard navigation for fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) =>
      event.key === 'Escape' && isFullscreen && closeFullscreen()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  useEffect(() => {
    if (isFullscreen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const getContainerHeight = useCallback(() => {
    if (aspectRatio === 'auto' && adaptiveHeight && imageHeights[current] !== undefined) {
      const calculatedHeight = imageHeights[current]
      const maxConstraint = isMobile ? Math.min(maxHeight, 500) : maxHeight
      return Math.min(calculatedHeight, maxConstraint)
    }
    if (aspectRatio === 'auto' && adaptiveHeight) return isMobile ? 280 : 350
    return maxHeight
  }, [aspectRatio, adaptiveHeight, imageHeights, current, isMobile, maxHeight])

  // Handle image load to calculate dynamic height
  const handleImageLoad = useCallback(
    (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
      if (aspectRatio !== 'auto' || !adaptiveHeight) return
      const renderedHeight = event.currentTarget.height
      setImageHeights((prev) => {
        if (prev[index] === renderedHeight) return prev
        const newHeights = [...prev]
        newHeights[index] = renderedHeight
        return newHeights
      })
    },
    [aspectRatio, adaptiveHeight]
  )

  // Update container height when current image changes with debounced optimization
  useEffect(() => {
    const newHeight = getContainerHeight()
    if (newHeight !== containerHeight) setContainerHeight(newHeight)
  }, [getContainerHeight, containerHeight])

  const handleSlideChange = (swiper: SwiperType) => setCurrent(swiper.activeIndex)

  const swiperConfig = {
    modules: [Navigation, Pagination, Keyboard, A11y],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom'
    },
    pagination: {
      el: '.swiper-pagination-custom',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet-custom',
      bulletActiveClass: 'swiper-pagination-bullet-active-custom'
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    a11y: {
      enabled: true
    },
    speed: isMobile ? 200 : 300,
    onSlideChange: handleSlideChange,
    onSwiper: (swiper: SwiperType) => {
      swiperRef.current = swiper
    }
  }

  const fullscreenSwiperConfig = {
    modules: [Navigation, Pagination, Keyboard, A11y],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next-fullscreen',
      prevEl: '.swiper-button-prev-fullscreen'
    },
    pagination: {
      el: '.swiper-pagination-fullscreen',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet-fullscreen',
      bulletActiveClass: 'swiper-pagination-bullet-active-fullscreen'
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    a11y: {
      enabled: true
    },
    speed: isMobile ? 200 : 300,
    initialSlide: current,
    onSlideChange: handleSlideChange,
    onSwiper: (swiper: SwiperType) => (fullscreenSwiperRef.current = swiper)
  }

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ x: 30, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
        transition={{
          duration: isMobile ? 0.4 : 0.6,
          delay: isMobile ? 0.1 : 0.2,
          ease: 'easeOut'
        }}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="relative w-full max-w-2xl">
          <div
            className="relative min-h-[350px] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
            style={{
              height: containerHeight,
              transform: 'translateZ(0)', // Force hardware acceleration
              willChange: adaptiveHeight && animateHeight ? 'height' : 'auto', // Only optimize when needed
              transition:
                adaptiveHeight && animateHeight
                  ? isMobile
                    ? 'height 150ms cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'height 200ms cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none'
            }}
          >
            <Swiper {...swiperConfig} className="h-full w-full">
              {images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center p-2">
                  <div
                    className="group relative flex h-full w-full cursor-pointer items-center justify-center"
                    onClick={openFullscreen}
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      width={800}
                      height={600}
                      alt={`Image ${index + 1}`}
                      className="max-h-[480px] max-w-full rounded-lg object-contain"
                      priority={index === current}
                      loading={Math.abs(index - current) <= 1 ? 'eager' : 'lazy'}
                      onLoad={(e) => handleImageLoad(index, e)}
                    />
                    {!isMobile && (
                      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <button
              className="swiper-button-prev-custom absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95 dark:bg-gray-900/90 dark:hover:bg-gray-900"
              aria-label="Previous image"
            >
              <svg
                className="h-5 w-5 text-gray-700 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="swiper-button-next-custom absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95 dark:bg-gray-900/90 dark:hover:bg-gray-900"
              aria-label="Next image"
            >
              <svg
                className="h-5 w-5 text-gray-700 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Custom pagination */}
          <div className="swiper-pagination-custom mt-4 flex justify-center space-x-1.5"></div>
        </div>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.3 }}
            onClick={closeFullscreen}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <Swiper
                {...fullscreenSwiperConfig}
                className="flex h-full w-full items-center justify-center"
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={`fullscreen-${index}`}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <div
                      className="flex h-full w-full items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={image || '/placeholder.svg'}
                        width={1920}
                        height={1080}
                        alt={`Image ${index + 1} - Fullscreen`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        priority={Math.abs(index - current) <= 1}
                        loading={Math.abs(index - current) <= 1 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                closeFullscreen()
              }}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-all hover:bg-neutral-800/80"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Fullscreen navigation */}
            <button
              className="swiper-button-prev-fullscreen absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800 transition-all hover:bg-neutral-800/80"
              aria-label="Previous image"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="swiper-button-next-fullscreen absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800 transition-all hover:bg-neutral-800/80"
              aria-label="Next image"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image counter */}
            <div
              className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm text-white">
                {current + 1} / {images.length}
              </span>
            </div>

            {/* Fullscreen pagination */}
            <div
              className="swiper-pagination-fullscreen absolute bottom-16 left-1/2 z-50 -translate-x-1/2"
              onClick={(e) => e.stopPropagation()}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: rgb(209 213 219);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
          margin: 0 3px;
        }

        .swiper-pagination-bullet-active-custom {
          background: rgb(31 41 55);
          transform: scale(1.25);
        }

        .dark .swiper-pagination-bullet-custom {
          background: rgba(255, 255, 255, 0.3);
        }

        .dark .swiper-pagination-bullet-active-custom {
          background: white;
        }

        .swiper-pagination-bullet-fullscreen {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
          margin: 0 4px;
        }

        .swiper-pagination-bullet-active-fullscreen {
          background: white;
          transform: scale(1.2);
        }

        /* Ensure fullscreen Swiper slides are centered */
        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Remove default Swiper button styles since we use custom ones */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        @media (max-width: 768px) {
          .swiper-pagination-bullet-custom,
          .swiper-pagination-bullet-fullscreen {
            transition-duration: 0.15s;
          }
        }
      `}</style>
    </>
  )
}
