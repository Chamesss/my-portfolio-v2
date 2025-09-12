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
import StarField from '@/components/starfield'

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
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <StarField />
            <Toaster position="bottom-left" />
          </ActiveSectionContextProvider>
          <ThemeSwitch />
        </ThemeContextProvider>
        <Analytics />
      </body>
    </html>
  )
}
