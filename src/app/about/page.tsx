'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Code, BarChart3, Database, BrainCog } from 'lucide-react'

export default function About() {
  const [aboutText, setAboutText] = useState<string>('')

  useEffect(() => {
    const fetchAbout = async () => {
      const ref = doc(db, 'site_content', 'about')
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = snap.data()
        setAboutText(data.text || '')
      } else {
        setAboutText('⚠️ No about content found in Firestore.')
      }
    }

    fetchAbout()
  }, [])

  return (
    <motion.main
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-6">About Me</h1>

      {/* טקסט דינמי מ־Firebase בפורמט HTML עשיר */}
      <motion.div
        className="prose dark:prose-invert max-w-none text-lg leading-relaxed mb-8"
        dangerouslySetInnerHTML={{ __html: aboutText }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      />

      {/* תמונה וטכנולוגיות */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Image
          src="/Sahar_Picture.png"
          alt="Sahar Abudi"
          width={250}
          height={250}
          className="rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            My Technical Stack
          </h2>
          <ul className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed list-disc list-inside space-y-1">
            <li><Code size={16} className="inline-block mr-2" /> Python (Pandas, NumPy, scikit-learn)</li>
            <li><Database size={16} className="inline-block mr-2" /> SQL (PostgreSQL, BigQuery)</li>
            <li><BarChart3 size={16} className="inline-block mr-2" /> Power BI, Tableau</li>
            <li><Code size={16} className="inline-block mr-2" /> Excel & automation with VBA</li>
            <li><BrainCog size={16} className="inline-block mr-2" /> Machine Learning basics</li>
          </ul>
        </div>
      </motion.div>

      {/* כפתורי יצירת קשר */}
      <motion.div
        className="text-center mt-8 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="https://www.linkedin.com/in/sahar-abudi/"
          target="_blank"
          className="px-6 py-3 bg-blue-700 dark:bg-blue-900 text-white rounded-lg shadow hover:bg-blue-800 dark:hover:bg-blue-950 transition"
        >
          Connect on LinkedIn
        </Link>
        <a
          href="mailto:saharabudi@yandex.com"
          className="px-6 py-3 bg-green-600 dark:bg-green-800 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-900 transition"
        >
          Send Me an Email
        </a>
        <Link
          href="/CV_Sahar_Abudi.pdf"
          target="_blank"
          className="px-6 py-3 bg-gray-700 dark:bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-950 transition"
        >
          Download My CV
        </Link>
      </motion.div>
    </motion.main>
  )
}
