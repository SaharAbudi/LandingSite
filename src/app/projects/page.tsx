'use client'

import Link from 'next/link'
import { BarChart4, Brain } from 'lucide-react'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Real Estate Price Analysis',
    icon: <BarChart4 size={22} className="text-blue-600" />,
    description:
      'Exploratory data analysis project that examines housing prices and trends at Delhi, India. Using structured real estate data. Includes visualizations and linear regression modeling.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'scikit-learn'],
    models: ['Multipe Linear Regression'],
    colab: 'https://colab.research.google.com/drive/1s5h1b2gd_umTNywRYTw5tjaZAPQGldG0?usp=sharing',
    github: 'https://github.com/SaharAbudi/real_estate_analysis_delhi',
    link: '/projects/RealEstatePage',
  },
  {
    title: 'Brain Stroke Prediction (ML)',
    icon: <Brain size={22} className="text-purple-600" />,
    description:
      'Machine learning classification project that predicts the likelihood of stroke based on health data. Preprocessing, feature selection, and model evaluation included.',
    tools: ['Python', 'Pandas', 'scikit-learn', 'Colab'],
    models: ['Decision Tree Classifier', 'Logistic Regression', 'KNN'],
    colab: 'https://colab.research.google.com/drive/13ddmc-gn2IGag6l-_yv8d1iYWBAhtLJd?usp=sharing',
    github: 'https://github.com/SaharAbudi/Brain-Stroke_ML_Analysis',
    link: '/projects/BrainStrokePage',
  },
]

export default function Projects() {
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
          <motion.div
            key={i}
            className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              {p.icon}
              <Link
                href={p.link}
                className="text-2xl font-semibold text-blue-800 hover:underline"
              >
                {p.title}
              </Link>
            </div>
            <p className="text-gray-700 mb-4">{p.description}</p>
            <p className="mb-1 text-sm text-gray-500">
              <strong>Tools:</strong> {p.tools.join(', ')}
            </p>
            <p className="mb-3 text-sm text-gray-500">
              <strong>Model(s):</strong> {p.models.join(', ')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={p.colab}
                target="_blank"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Open in Colab
              </Link>
              <Link
                href={p.github}
                target="_blank"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
              >
                View on GitHub
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}
