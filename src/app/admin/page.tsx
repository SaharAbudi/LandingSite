'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Wrench } from 'lucide-react'

const ADMIN_PASSWORD = 'sahar123' // שנה לסיסמה שלך

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
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Admin Login(PASSWORD: SAHAR123) :D</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={e => setInputPassword(e.target.value)}
          placeholder="Enter admin password"
          className="border p-2 w-full rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-full"
        >
          Login
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link href="/admin/add-project">
          <div className="flex items-center gap-4 p-5 rounded-xl border hover:shadow-lg transition bg-white hover:bg-blue-50">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-800">Add New Project</p>
              <p className="text-sm text-gray-500">Create a new portfolio project</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/edit-project">
          <div className="flex items-center gap-4 p-5 rounded-xl border hover:shadow-lg transition bg-white hover:bg-blue-50">
            <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-yellow-800">Edit Projects</p>
              <p className="text-sm text-gray-500">Modify or remove existing projects</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/edit-about">
          <div className="flex items-center gap-4 p-5 rounded-xl border hover:shadow-lg transition bg-white hover:bg-blue-50">
            <div className="bg-green-100 text-green-700 p-2 rounded-full">
              <Pencil className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-green-800">Edit About Page</p>
              <p className="text-sm text-gray-500">Update your biography and background</p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  )
}
