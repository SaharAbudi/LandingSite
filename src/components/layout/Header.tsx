'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, User, FolderOpen, Settings, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/useTheme'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-[#1877F2] dark:bg-[#0D1117] shadow-md sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-base">
        
        {/* Logo without text */}
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

        {/* Navigation */}
        <nav className="flex gap-6 sm:gap-8 items-center text-white dark:text-gray-200">
          <Link href="/" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
            <Home size={18} /> Home
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
            <User size={18} /> About
          </Link>
          <Link href="/projects" className="flex items-center gap-2 hover:text-blue-200 dark:hover:text-blue-400 transition">
            <FolderOpen size={18} /> Projects
          </Link>
          <Link href="/admin" className="flex items-center gap-2 hover:text-yellow-200 dark:hover:text-yellow-400 transition">
            <Settings size={18} /> Admin Panel
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:text-blue-200 dark:hover:text-blue-400 transition"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
