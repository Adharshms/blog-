// components/LoadingSpinner.tsx
'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <motion.div
        className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  )
}
