'use client'

import { useState } from 'react'
import { Menu, X, Home, User, FolderOpen, Settings } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md focus:outline-none focus:ring z-50 relative"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="fixed top-16 left-0 w-full bg-background shadow-lg z-50 flex flex-col items-center gap-6 p-6 text-foreground rounded-b-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <Home size={18} /> Home
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <User size={18} /> About
              </Link>
              <Link href="/projects" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <FolderOpen size={18} /> Projects
              </Link>
              <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <Settings size={18} /> Admin Panel
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
