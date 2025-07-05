'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  writeBatch,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Pencil, Trash2, GripVertical, Save } from 'lucide-react'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function EditProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [editingProject, setEditingProject] = useState<any | null>(null)
  const [status, setStatus] = useState('')
  const [isOrderChanged, setIsOrderChanged] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), orderBy('order'))
      const snapshot = await getDocs(q)
      const items = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        order: doc.data().order ?? index,
      }))
      setProjects(items)
    }
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await deleteDoc(doc(db, 'projects', id))
      setProjects(prev => prev.filter(p => p.id !== id))
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

  const handleSaveOrder = async () => {
    const batch = writeBatch(db)
    projects.forEach((proj, index) => {
      const ref = doc(db, 'projects', proj.id)
      batch.update(ref, { order: index })
    })
    await batch.commit()
    setStatus('✅ Project order saved')
    setIsOrderChanged(false)
    setTimeout(() => setStatus(''), 2500)
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = projects.findIndex(p => p.id === active.id)
      const newIndex = projects.findIndex(p => p.id === over.id)
      const newOrder = arrayMove(projects, oldIndex, newIndex)
      setProjects(newOrder)
      setIsOrderChanged(true)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">Edit Projects</h1>
        <Link
          href="/admin"
          className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-sm border border-blue-300 dark:border-blue-600"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {status && <p className="text-green-600 dark:text-green-400 mb-4">{status}</p>}

      {isOrderChanged && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleSaveOrder}
            className="flex items-center gap-2 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
          >
            <Save size={16} /> Save Project Order
          </button>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {projects.map((project) => (
              <SortableItem
                key={project.id}
                project={project}
                onDelete={handleDelete}
                onEdit={setEditingProject}
                editingProject={editingProject}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  )
}

function SortableItem({ project, onDelete, onEdit, editingProject, onUpdate }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="border p-4 rounded shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
      <div className="flex items-start gap-2">
        <div {...listeners} className="mt-1 text-gray-400 cursor-move">
          <GripVertical size={16} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{project.description}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Dialog open={editingProject?.id === project.id} onOpenChange={(open) => { if (!open) onEdit(null) }}>
          <DialogTrigger asChild>
            <button
              className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 p-1 rounded transition"
              onClick={() => onEdit(project)}
            >
              <Pencil size={18} />
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto dark:bg-gray-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Edit Project</h2>
            {editingProject && (
              <div className="space-y-3">
                {[{ label: 'Title', key: 'title' }, { label: 'Description', key: 'description', type: 'textarea' }, { label: 'Link', key: 'link' }, { label: 'Tools', key: 'tools' }, { label: 'Models', key: 'models' }].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1">{label}</label>
                    {type === 'textarea' ? (
                      <textarea
                        value={editingProject?.[key] || ''}
                        onChange={e => onEdit({ ...editingProject, [key]: e.target.value })}
                        className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
                        rows={3}
                      />
                    ) : (
                      <input
                        value={Array.isArray(editingProject?.[key])
                          ? editingProject[key].join(', ')
                          : editingProject?.[key] || ''}
                        onChange={e =>
                          onEdit({
                            ...editingProject,
                            [key]: key === 'tools' || key === 'models'
                              ? e.target.value.split(',').map((x: string) => x.trim())
                              : e.target.value
                          })
                        }
                        className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-4 mt-4">
                  <button onClick={onUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Save Changes</button>
                  <button onClick={() => onEdit(null)} className="px-4 py-2 rounded border dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">Cancel</button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <button onClick={() => onDelete(project.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500 p-1 rounded transition">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
