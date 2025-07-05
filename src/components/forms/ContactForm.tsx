'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      setStatus('❌ Please fill in all fields.')
      return
    }

    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...form,
        createdAt: serverTimestamp(),
      })
      setStatus('✅ Message sent successfully!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('❌ Failed to send message.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-md dark:bg-gray-900 dark:border-gray-700"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-md dark:bg-gray-900 dark:border-gray-700"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        rows={6}
        className="w-full px-4 py-3 border rounded-md dark:bg-gray-900 dark:border-gray-700"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded flex items-center gap-2"
      >
        <Send size={16} /> Send Message
      </button>

      {status && (
        <p className="text-sm mt-2 text-blue-700 dark:text-blue-300">{status}</p>
      )}
    </form>
  )
}
