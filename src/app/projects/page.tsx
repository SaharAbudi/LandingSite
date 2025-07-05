'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeInOnScroll from '../../components/FadeInOnScroll'

interface Project {
  title: string
  description: string
  tools: string[] | string
  models: string[] | string
  colab?: string
  github?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => doc.data() as Project)
      setProjects(data)
    }

    fetchProjects()
  }, [])

  return (
    <motion.main
      className="max-w-5xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-4xl font-bold text-blue-800 mb-10">My Projects</h1>

      <div className="grid gap-8">
        {projects.map((p, i) => (
          <FadeInOnScroll key={i} delay={0.2 + i * 0.15}>
            <div className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-semibold text-blue-800">
                  {p.title}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{p.description}</p>
              <p className="mb-1 text-sm text-gray-500">
                <strong>Tools:</strong>{' '}
                {Array.isArray(p.tools) ? p.tools.join(', ') : p.tools}
              </p>
              <p className="mb-3 text-sm text-gray-500">
                <strong>Model(s):</strong>{' '}
                {Array.isArray(p.models) ? p.models.join(', ') : p.models}
              </p>
              <div className="flex flex-wrap gap-4">
                {p.colab && (
                  <Link
                    href={p.colab}
                    target="_blank"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Open in Colab
                  </Link>
                )}
                {p.github && (
                  <Link
                    href={p.github}
                    target="_blank"
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                  >
                    View on GitHub
                  </Link>
                )}
              </div>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </motion.main>
  )
}
