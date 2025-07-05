'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Wrench } from 'lucide-react'

const ADMIN_PASSWORD = 'sahar123' // שנה לסיסמה חזקה יותר בפרודקשן

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inputPassword, setInputPassword] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdmin') === 'true'
    if (isLoggedIn) setIsAuthenticated(true)
  }, [])

  const handleLogin = () => {
    if (inputPassword === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true')
      setIsAuthenticated(true)
    } else {
      alert('❌ סיסמה שגויה')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <main className="max-w-sm mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
          Admin Login (PASSWORD: SAHAR123)
        </h2>
        <input
          type="password"
          value={inputPassword}
          onChange={e => setInputPassword(e.target.value)}
          placeholder="Enter admin password"
          className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-full transition"
        >
          Login
        </button>
      </main>
    )
  }

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
      </div>

      {/* Logout button */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Log-out
        </button>
      </div>
    </main>
  )
}
