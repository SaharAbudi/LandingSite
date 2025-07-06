'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function AddProjectPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [github, setGithub] = useState('')
  const [colab, setColab] = useState('')
  const [tools, setTools] = useState('')
  const [models, setModels] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const toastId = toast.loading('⏳ Adding project...')

    try {
      await addDoc(collection(db, 'projects'), {
        title,
        description,
        github,
        colab,
        link,
        tools: tools.split(',').map(t => t.trim()),
        models: models.split(',').map(m => m.trim()),
        createdAt: new Date(),
      })

      toast.success('✅ Project added successfully!', { id: toastId })
      setTitle('')
      setDescription('')
      setGithub('')
      setColab('')
      setTools('')
      setModels('')
      setLink('')
    } catch (error) {
      console.error('Error adding project:', error)
      toast.error('❌ Failed to add project', { id: toastId })
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Add New Project</h1>
        <Link
          href="/admin"
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm border border-blue-300"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded p-2 shadow-sm" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full border rounded p-2 shadow-sm" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input value={github} onChange={e => setGithub(e.target.value)} className="w-full border rounded p-2 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Colab URL</label>
            <input value={colab} onChange={e => setColab(e.target.value)} className="w-full border rounded p-2 shadow-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Internal Link (optional)</label>
          <input value={link} onChange={e => setLink(e.target.value)} className="w-full border rounded p-2 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tools (comma-separated)</label>
          <input value={tools} onChange={e => setTools(e.target.value)} className="w-full border rounded p-2 shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Models (comma-separated)</label>
          <input value={models} onChange={e => setModels(e.target.value)} className="w-full border rounded p-2 shadow-sm" />
        </div>

        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          ➕ Add Project
        </button>
      </form>
    </main>
  )
}
