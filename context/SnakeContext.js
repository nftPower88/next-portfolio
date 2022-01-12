import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'

const SnakeContext = createContext()

export function useSnake() {
  return useContext(SnakeContext)
}

export function SnakeProvider({ children }) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [score, setScore] = useState(0)
  const [topScores, setTopScores] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10)),
      (snapshot) => {
        const scores = snapshot.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }))
        setTopScores(scores)
      }
    )

    return unsubscribe
  }, [db])

  async function addScore() {
    await addDoc(collection(db, 'scores'), {
      name: name === '' ? 'Guest' : name,
      company: company === '' ? '' : company,
      score,
    })
  }

  return (
    <div>
      <SnakeContext.Provider
        value={{
          name,
          setName,
          company,
          setCompany,
          score,
          setScore,
          topScores,
          addScore,
        }}
      >
        {children}
      </SnakeContext.Provider>
    </div>
  )
}
