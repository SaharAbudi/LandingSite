'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.main
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-4xl font-bold text-blue-800 mb-6">About Me</h1>

      {/* פתיח אישי */}
      <motion.p
        className="text-xl text-gray-700 leading-relaxed mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        👋 Hi, I’m <strong className="text-blue-800">Sahar Abudi</strong> — a data analyst passionate about turning raw data into strategic insight.
        I specialize in marketing analytics, product strategy, and building dashboards that tell clear and impactful stories.
      </motion.p>

      {/* מבנה דו-צדדי */}
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
          className="rounded-full shadow-md"
        />
        <p className="text-lg text-gray-800 leading-relaxed">
          As a Data Analyst with a background in Technology Management from Bar-Ilan University, I specialize in building complete data pipelines — from raw data collection to sophisticated dashboards and decision-making tools.
          During my studies, I developed a deep understanding of statistical analysis, business intelligence, and process optimization. Additionally, I completed an internship at VPlans, where I applied my skills in data analysis and contributed to streamlining operations and improving decision-making frameworks.
        </p>
      </motion.div>

      {/* הכלים שלי */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">My Toolbox</h2>
        <ul className="list-disc list-inside text-gray-800 text-lg space-y-1">
          <li>Python (Pandas, NumPy, scikit-learn)</li>
          <li>SQL (PostgreSQL, BigQuery)</li>
          <li>BI Tools: (Power BI, Tableau)</li>
          <li>RStudio Scripting</li>
          <li>Excel & automation with VBA</li>
          <li>Data visualization & dashboarding</li>
          <li>Machine Learning basics</li>
        </ul>
      </motion.div>

      {/* פילוסופיה אישית */}
      <motion.p
        className="text-gray-800 text-lg leading-relaxed mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        I’m driven by curiosity, value creation, and the belief that data can empower better decisions. I enjoy building tools that are not only functional, but also intuitive and insightful.
        Whether it’s ML models, KPI dashboards, or product analytics — I aim to create clarity from complexity.
      </motion.p>

      {/* כפתורים */}
      <motion.div
        className="text-center mt-8 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <a
          href="https://www.linkedin.com/in/sahar-abudi/"
          className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>

        <a
          href="mailto:saharabudi@yandex.com"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Send Me an Email
        </a>
      </motion.div>
    </motion.main>
  )
}
