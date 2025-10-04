'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-background text-foreground">
      {/* שם וכותרת */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
          Sahar Abudi
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Data Analyst · Turning Data Into Strategic Insights
        </p>
      </motion.div>

      {/* קלפים */}
      <motion.div
        className="mt-16 grid gap-6 sm:grid-cols-3 max-w-5xl w-full"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          {
            title: 'Data Analysis',
            desc: 'Exploring complex datasets to uncover trends, patterns, and actionable business insights.',
            link: '/projects',
          },
          {
            title: 'Visualization',
            desc: 'Designing clear and interactive dashboards using Excel, Tableau and Power BI.',
            link: '/projects',
          },
          {
            title: 'Business Impact',
            desc: 'Transforming data into stories that support decisions and optimize performance.',
            link: '/about',
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="bg-card border border-border rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              {card.title}
            </h2>
            <p className="text-muted-foreground mb-4">{card.desc}</p>
            <Link
              href={card.link}
              className="text-primary font-medium hover:underline"
            >
              Learn more →
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* סקילס */}
      <motion.div
        className="mt-16 flex flex-wrap justify-center gap-3 text-muted-foreground text-sm max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          'Excel',
          'SQL',
          'Python (Pandas, NumPy)',
          'Tableau',
          'Power BI',
          'Data Cleaning',
          'ETL',
          'Reporting',
          'Dashboard Design',
        ].map((skill) => (
          <span
            key={skill}
            className="bg-secondary px-3 py-1 rounded-full border border-border"
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* קריאה לפעולה */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/projects"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl shadow hover:bg-primary/80 transition"
        >
          View Analytical Projects
        </Link>
      </motion.div>
    </main>
  )
}
