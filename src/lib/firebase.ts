// src/lib/firebase.ts

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCvAifepvgQulBsKQm5j7unXLz2oirpo1c",
  authDomain: "portfolio-admin-d2876.firebaseapp.com",
  projectId: "portfolio-admin-d2876",
  storageBucket: "portfolio-admin-d2876.appspot.com",
  messagingSenderId: "1003628120527",
  appId: "1:1003628120527:web:ed827aeae5cbfd3269aaba",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
