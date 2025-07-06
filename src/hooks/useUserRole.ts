// src/hooks/useUserRole.ts
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function useUserRole() {
  const [user] = useAuthState(auth)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setRole(null)
      return
    }

    const fetchRole = async () => {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setRole(docSnap.data().role as string)
      } else {
        setRole(null)
      }
    }

    fetchRole()
  }, [user])

  return role
}
