// src/app/signup/page.tsx
'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // שמירת המשתמש ב-Firestore ללא תפקיד admin
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        // לא מוסיפים כאן שדה role, יש להגדיר ידנית למי שצריך admin
      })

      toast.success('Account created successfully!')
      router.push('/login') // לאחר ההרשמה הפנה ל־Login
    } catch (err: any) {
      toast.error(`Signup failed: ${err.message}`)
      console.error(err)
    }
  }

  return (
    <main className="max-w-sm mx-auto mt-16 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">📝 Create Account</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-gray-700"
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-gray-700"
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          ✅ Sign Up
        </button>
      </form>
    </main>
  )
}
