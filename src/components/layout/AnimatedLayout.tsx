'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

export default function AnimatedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [displayedChildren, setDisplayedChildren] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (children !== displayedChildren) {
      setIsAnimating(true)

      const timeout = setTimeout(() => {
        setDisplayedChildren(children)
        setIsAnimating(false)
      }, 400) // משך האנימציה
      return () => clearTimeout(timeout)
    }
  }, [children, displayedChildren])

  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {displayedChildren}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
