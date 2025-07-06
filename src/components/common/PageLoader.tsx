'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="pageloader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
