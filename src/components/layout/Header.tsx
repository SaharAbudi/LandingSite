'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, User, FolderOpen, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-[#1877F2] shadow-md sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-base">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={28}
            height={28}
            className="rounded shadow"
          />
          <span className="text-white font-semibold hidden sm:inline">Sahar Abudi</span>
        </Link>

        <nav className="flex gap-8 items-center text-white">
          <Link href="/" className="flex items-center gap-2 hover:text-blue-200 transition">
            <Home size={18} /> Home
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-blue-200 transition">
            <User size={18} /> About
          </Link>
          <Link href="/projects" className="flex items-center gap-2 hover:text-blue-200 transition">
            <FolderOpen size={18} /> Projects
          </Link>
          <Link href="/admin" className="flex items-center gap-2 hover:text-yellow-200 transition">
            <Settings size={18} /> Admin Panel
          </Link>
        </nav>
      </div>
    </header>
  )
}
