'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      toast.error('❌ Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...form,
        createdAt: serverTimestamp(),
      })

      toast.success('✅ Message sent successfully!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      toast.error('❌ Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 w-full max-w-2xl mx-auto border dark:border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-4">
        📬 Get in Touch
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Have a question, idea, or collaboration in mind? Send me a message.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Your message here..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all shadow-md disabled:opacity-50"
        >
          <Send size={18} />
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </motion.div>
  )
}
