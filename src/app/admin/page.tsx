'use client'

import Link from 'next/link'
import { Plus, Pencil, Wrench, Mail } from 'lucide-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ADMIN_EMAIL = 'admin@admin.com' // הכנס כאן את האימייל שלך בלבד

export default function AdminPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/')  // מפנה לדף הבית אם לא מחובר או לא מנהל
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <main className="max-w-sm mx-auto px-6 py-20 text-center">
        <p>Loading...</p>
      </main>
    )
  }

  if (!user || user.email !== ADMIN_EMAIL) return null // מונע רנדר בזמן המעבר

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-10">
        Admin Panel
      </h1>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <Link href="/admin/add-project">
          <div className="flex items-center gap-4 p-5 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:bg-blue-50 dark:hover:bg-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-2 rounded-full">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">Add New Project</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new portfolio project</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/edit-project">
          <div className="flex items-center gap-4 p-5 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:bg-yellow-50 dark:hover:bg-gray-700">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 p-2 rounded-full">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">Edit Projects</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Modify or remove existing projects</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/edit-about">
          <div className="flex items-center gap-4 p-5 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:bg-green-50 dark:hover:bg-gray-700">
            <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-2 rounded-full">
              <Pencil className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-green-800 dark:text-green-300">Edit About Page</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your biography and background</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/view-messages">
          <div className="flex items-center gap-4 p-5 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition hover:bg-purple-50 dark:hover:bg-gray-700">
            <div className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 p-2 rounded-full">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-purple-800 dark:text-purple-300">View Messages</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Read incoming contact form messages</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Logout button */}
      <div className="flex justify-center">
        <button
          onClick={() => signOut(auth)}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Log-out
        </button>
      </div>
    </main>
  )
}
