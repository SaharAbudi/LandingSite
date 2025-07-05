'use client'

import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import LinkExtension from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Undo,
  Redo,
  Save,
} from 'lucide-react'

export default function EditAboutPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write something about yourself...' }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'min-h-[300px] prose dark:prose-invert prose-sm sm:prose-base focus:outline-none px-4 py-3',
      },
    },
  })

  useEffect(() => {
    const fetchAbout = async () => {
      const docRef = doc(db, 'site_content', 'about')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        editor?.commands.setContent(docSnap.data().text || '')
      }
      setLoading(false)
    }

    if (editor) fetchAbout()
  }, [editor])

  const handleSave = async () => {
    if (!editor) return
    try {
      await setDoc(doc(db, 'site_content', 'about'), {
        text: editor.getHTML(),
      })
      setStatus('✔ Saved successfully!')
      setTimeout(() => setStatus(''), 2500)
    } catch (error) {
      console.error('Save error:', error)
      setStatus('❌ Failed to save')
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter a URL')
    if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">
        Edit About Me Section
      </h1>

      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 mb-3 border rounded bg-gray-100 dark:bg-gray-900 p-2 border-gray-300 dark:border-gray-700">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn-toolbar">
            <Bold size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn-toolbar">
            <Italic size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn-toolbar">
            <UnderlineIcon size={16} />
          </button>
          <button onClick={addLink} className="btn-toolbar">
            <LinkIcon size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn-toolbar">
            <List size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn-toolbar">
            <ListOrdered size={16} />
          </button>
          <button onClick={() => editor.chain().focus().undo().run()} className="btn-toolbar">
            <Undo size={16} />
          </button>
          <button onClick={() => editor.chain().focus().redo().run()} className="btn-toolbar">
            <Redo size={16} />
          </button>
        </div>
      )}

      <div className="border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 shadow-sm">
        {loading ? (
          <p className="text-center p-4 text-gray-600 dark:text-gray-300">Loading content...</p>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Save size={18} /> Save
        </button>

        <Link
          href="/admin"
          className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600 px-4 py-2 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {status && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400">{status}</p>
      )}
    </main>
  )
}
