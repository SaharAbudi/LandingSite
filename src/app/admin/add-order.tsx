'use client'

import { useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore'

export default function AddOrderScript() {
  useEffect(() => {
    const addOrderField = async () => {
      const snapshot = await getDocs(collection(db, 'projects'))
      const docs = snapshot.docs

      const batch = writeBatch(db)
      docs.forEach((d, i) => {
        const ref = doc(db, 'projects', d.id)
        batch.update(ref, { order: i })
      })

      await batch.commit()
      console.log('✅ Order field added to all projects.')
    }

    addOrderField()
  }, [])

  return <p>Running order update...</p>
}
