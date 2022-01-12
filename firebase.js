import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB5GupZHFnG8rd9aiACplJ73JNRXRMWHSU',
  authDomain: 'next-portfolio-b90b7.firebaseapp.com',
  projectId: 'next-portfolio-b90b7',
  storageBucket: 'next-portfolio-b90b7.appspot.com',
  messagingSenderId: '139741735429',
  appId: '1:139741735429:web:b69485f845452b37458a6c',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()

export { app, db }
