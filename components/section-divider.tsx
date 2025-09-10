'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function SectionDivider({ className }: { className?: string }) {
  return (
    <motion.div
      className={clsx(
        'my-24 block h-16 w-1 rounded-full bg-gray-200 dark:bg-opacity-20',
        className
      )}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    />
  )
}
