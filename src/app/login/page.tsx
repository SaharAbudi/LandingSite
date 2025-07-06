// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')
      router.push('/admin') // נניח שזה דף המוגן שלך
    } catch (err) {
      toast.error('Login failed')
      console.error(err)
    }
  }

  return (
    <main className="max-w-sm mx-auto mt-16 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">🔐 Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-gray-700" required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-gray-700" required />
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          🚪 Login
        </button>
      </form>
    </main>
  )
}
