'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

export default function EditAboutPage() {
  const [aboutText, setAboutText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchAbout = async () => {
      const docRef = doc(db, 'site_content', 'about')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setAboutText(docSnap.data().text || '')
      }
    }
    fetchAbout()
  }, [])

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'site_content', 'about'), { text: aboutText })
      setStatus('✔ נשמר בהצלחה!')
      setTimeout(() => setStatus(''), 2500)
    } catch (error) {
      console.error('שגיאה בשמירה:', error)
      setStatus('❌ שגיאה בשמירה')
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Edit About Me</h1>

      <textarea
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        rows={12}
        className="w-full border border-gray-300 p-3 rounded text-gray-800 mb-4 shadow-sm"
        placeholder="Write your about text here..."
      />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Save
        </button>

        <Link
          href="/admin"
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 border border-blue-300"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {status && (
        <p className="mt-3 text-sm text-green-600">{status}</p>
      )}
    </main>
  )
}
