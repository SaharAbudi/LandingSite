'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Mail, ArrowLeft, Trash, Copy, Download } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  message: string
  createdAt?: any
}

export default function ViewMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[]
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    try {
      await deleteDoc(doc(db, 'contact_messages', id))
      setMessages(messages.filter(m => m.id !== id))
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('📋 Email copied to clipboard!')
  }

  const handleExportCSV = () => {
    const header = ['Name', 'Email', 'Message', 'Date']
    const rows = messages.map(msg => [
      msg.name,
      msg.email,
      msg.message.replace(/\n/g, ' '),
      msg.createdAt?.toDate?.().toLocaleString?.() || '',
    ])
    const csvContent =
      [header, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'messages.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <Mail size={28} /> Contact Messages
        </h1>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No messages found.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map(msg => (
            <li
              key={msg.id}
              className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900 shadow relative"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {msg.createdAt?.toDate?.().toLocaleString?.() || 'Unknown date'}
              </p>

              <div className="mb-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">Name:</label>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">{msg.name}</h3>
              </div>

              <div className="mb-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">Email:</label>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  {msg.email}
                  <button onClick={() => handleCopy(msg.email)} title="Copy email">
                    <Copy size={16} className="hover:text-blue-500" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Message:</label>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{msg.message}</p>
              </div>

              <button
                onClick={() => handleDelete(msg.id)}
                title="Delete"
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              >
                <Trash size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Back Button */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/admin"
          className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg border border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
        >
          <ArrowLeft size={16} /> Back to Admin Panel
        </Link>
      </div>
    </main>
  )
}
