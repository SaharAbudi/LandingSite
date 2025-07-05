'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Home,
  User,
  FolderOpen,
  Settings,
  Moon,
  Sun,
  Mail,
} from 'lucide-react'
import { useTheme } from '@/lib/useTheme'
import MobileMenu from '@/components/MobileMenu'
import { motion } from 'framer-motion'

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-[#1877F2] dark:bg-[#0D1117] shadow-md sticky top-0 z-50"
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-base">

        {/* Logo + Theme Toggle */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={28}
              height={28}
              className="rounded shadow"
              priority={true}
            />
          </Link>
          <button
            onClick={toggleTheme}
            className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-blue-400 transition"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </motion.div>

        {/* Navigation – Desktop */}
        <motion.nav
          className="hidden md:flex gap-6 sm:gap-8 items-center text-white dark:text-gray-200"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={linkVariants}>
            <Link href="/" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
              <Home size={18} /> Home
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link href="/about" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
              <User size={18} /> About
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link href="/projects" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
              <FolderOpen size={18} /> Projects
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link href="/contact" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
              <Mail size={18} /> Contact
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link href="/admin" className="flex items-center gap-2 hover:text-yellow-200 dark:hover:text-yellow-400 transition">
              <Settings size={18} /> Admin Panel
            </Link>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center text-white dark:text-gray-200">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  )
}
