'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  const [aboutText, setAboutText] = useState<string>('')
  const [toolboxText, setToolboxText] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchAboutAndToolbox = async () => {
      try {
        const aboutRef = doc(db, 'site_content', 'about')
        const toolboxRef = doc(db, 'site_content', 'toolbox')

        const [aboutSnap, toolboxSnap] = await Promise.all([
          getDoc(aboutRef),
          getDoc(toolboxRef),
        ])

        if (!isMounted) return

        setAboutText(aboutSnap.exists() ? (aboutSnap.data().text as string) || '' : '')
        setToolboxText(toolboxSnap.exists() ? (toolboxSnap.data().text as string) || '' : '')
      } catch (error) {
        console.error('Error loading about/toolbox:', error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAboutAndToolbox()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-8 text-center text-muted-foreground">
        Loading content...
      </main>
    )
  }

  return (
    <motion.main
      className="max-w-4xl mx-auto p-8 text-foreground"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-4xl font-bold text-primary mb-8">About Me</h1>

      {/* טקסט מ־Firestore */}
      {aboutText ? (
        <motion.div
          className="prose dark:prose-invert max-w-none text-lg leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: aboutText }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
      ) : null}

      {/* Toolbox */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 mb-12"
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

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-4">My Technical Stack</h2>

          {toolboxText ? (
            <div
              className="prose dark:prose-invert text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: toolboxText }}
            />
          ) : (
            <p className="text-muted-foreground">
              No toolbox content found. Please add it in the admin panel.
            </p>
          )}
        </div>
      </motion.div>

      {/* קישורים */}
      <motion.div
        className="text-center mt-8 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="https://www.linkedin.com/in/sahar-abudi/"
          target="_blank"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/80 transition"
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
          className="px-6 py-3 bg-secondary text-foreground rounded-lg shadow hover:bg-secondary/80 transition"
        >
          Download My CV
        </Link>
      </motion.div>
    </motion.main>
  )
}
