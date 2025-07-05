'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const fullName = 'Sahar Abudi'
  const [typedName, setTypedName] = useState('')
  const [doneTyping, setDoneTyping] = useState(false)

  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      setTypedName(fullName.slice(0, index + 1))
      index++

      if (index === fullName.length) {
        clearInterval(typeInterval)
        setTimeout(() => setDoneTyping(true), 300)
      }
    }, 120)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16 text-center">
      {/* תמונה עגולה */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/og-image.jpg"
          alt="Sahar Abudi"
          width={250}
          height={250}
          className="rounded-full border-4 border-blue-300 dark:border-blue-600 shadow-md"
        />
      </motion.div>

      {/* שם מוקלד */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-blue-800 dark:text-blue-400 min-h-[72px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {typedName}
      </motion.h1>

      {/* כותרת משנה */}
      {doneTyping && (
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Data Analyst | Project Manager | Technology Management
        </motion.p>
      )}

      {/* תיאור כללי */}
      {doneTyping && (
        <motion.p
          className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          I specialize in transforming data into business value. From marketing insights to strategic dashboards,
          my work bridges the gap between data and decisions.
        </motion.p>
      )}

      {/* כפתורים */}
      {doneTyping && (
        <motion.div
          className="mt-10 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-white dark:bg-transparent border border-blue-700 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900 transition"
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
          >
            Contact
          </Link>
        </motion.div>
      )}
    </main>
  )
}
