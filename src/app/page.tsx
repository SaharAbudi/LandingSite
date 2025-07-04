'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16 bg-gradient-to-b from-white to-blue-50 text-center">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/og-image.jpg" // שנה לשם התמונה שיש לך ב־public או מחק אם לא קיים
          alt="Sahar Abudi"
          width={250}
          height={250}
          className="rounded-full border-4 border-blue-300 shadow-md"
        />
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-blue-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Sahar Abudi
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Data Analyst & Project Manager specializing in turning raw data into actionable insights.
        Focused on marketing, product, and performance analytics.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap gap-6 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Link
          href="/projects"
          className="px-6 py-3 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
        >
          View Projects
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 bg-white border border-blue-700 text-blue-700 rounded-xl hover:bg-blue-50 transition"
        >
          About Me
        </Link>
      </motion.div>
    </main>
  )
}
