'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Pencil, Trash2 } from 'lucide-react'

export default function EditProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [editingProject, setEditingProject] = useState<any | null>(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, 'projects'))
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProjects(items)
    }
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await deleteDoc(doc(db, 'projects', id))
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleUpdate = async () => {
    if (!editingProject) return
    try {
      const { id, ...data } = editingProject
      await updateDoc(doc(db, 'projects', id), data)
      setStatus('✅ Project updated')
      setEditingProject(null)
      setTimeout(() => setStatus(''), 2500)
    } catch (err) {
      console.error(err)
      setStatus('❌ Update failed')
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Edit Projects</h1>
        <Link
          href="/admin"
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm border border-blue-300"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {status && <p className="text-green-600 mb-4">{status}</p>}

      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="border p-4 rounded shadow-sm bg-white flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="text-blue-600 hover:text-blue-800 p-1 rounded transition"
                    onClick={() => setEditingProject(project)}
                  >
                    <Pencil size={18} />
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-semibold mb-4 text-blue-700">Edit Project</h2>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <input
                        value={editingProject?.title || ''}
                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <textarea
                        value={editingProject?.description || ''}
                        onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full border p-2 rounded"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">GitHub URL</label>
                      <input
                        value={editingProject?.github || ''}
                        onChange={e => setEditingProject({ ...editingProject, github: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Colab URL</label>
                      <input
                        value={editingProject?.colab || ''}
                        onChange={e => setEditingProject({ ...editingProject, colab: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Internal Link</label>
                      <input
                        value={editingProject?.link || ''}
                        onChange={e => setEditingProject({ ...editingProject, link: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tools (comma-separated)</label>
                      <input
                        value={editingProject?.tools?.join(', ') || ''}
                        onChange={e => setEditingProject({ ...editingProject, tools: e.target.value.split(',').map(t => t.trim()) })}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Models (comma-separated)</label>
                      <input
                        value={editingProject?.models?.join(', ') || ''}
                        onChange={e => setEditingProject({ ...editingProject, models: e.target.value.split(',').map(m => m.trim()) })}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </DialogContent>
              </Dialog>

              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-600 hover:text-red-800 p-1 rounded transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
