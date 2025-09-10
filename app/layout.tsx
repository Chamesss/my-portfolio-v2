import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import { Analytics } from '@vercel/analytics/react'
import ActiveSectionContextProvider from '@/context/active-section-context'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer'
import ThemeSwitch from '@/components/theme-switch'
import ThemeContextProvider from '@/context/theme-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChamseDin Azouz | Portfolio',
  description: 'I am a full-stack web developer. This portfolio showcases my work.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <meta name="author" content="ChamseDin Azouz" />
      <meta property="og:title" content="ChamseDin Azouz | Portfolio" />
      <meta
        property="og:description "
        content="I am a full-stack web developer. This portfolio showcases my work."
      />
      <meta property="og:url" content="https://chamsedin-azouz.vercel.app/" />
      <meta
        property="og:image"
        content="https://chamsedin-azouz.vercel.app/_next/image?url=%2Fopengraph.png&w=640&q=95"
      />
      <body
        className={`${inter.className} relative overflow-x-hidden bg-gray-50 pt-40 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 sm:pt-56`}
      >
        <div className="absolute right-[11rem] top-[calc(160vh)] -z-10 h-[11.25rem] w-[21.25rem] rounded-full bg-[#fad3d5] blur-[10rem] dark:bg-[#1e293b] sm:w-[68.75rem]" />
        <div className="absolute left-[-35rem] top-[calc(180vh)] -z-10 h-[10.25rem] w-[20rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
        <div className="absolute left-[-35rem] top-[50%] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#3e3c5ab8] sm:w-[68.75rem] md:left-[-33rem] lg:left-0 xl:right-20 2xl:right-20" />
        <div className="absolute bottom-0 right-[11rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#a16b6c33] sm:w-[68.75rem]" />
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position="bottom-left" />
          </ActiveSectionContextProvider>
          <ThemeSwitch />
        </ThemeContextProvider>
        <Analytics />
      </body>
    </html>
  )
}
