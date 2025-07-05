'use client'

import { useEffect, useState } from 'react'

type Score = {
  userID: number
  username: string
  score: number
}

export default function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([])
  const [error, setError] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000'

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/leaderboard`)
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        const data = await res.json()
        setScores(data)
      } catch (err) {
        console.error('Fetch failed:', err)
        setError('Failed to load leaderboard. Please try again later.')
      }
    }

    fetchLeaderboard()
  }, [apiUrl])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-indigo-900 font-press-start text-center text-white p-6">
      <div>
        <h1 className="text-green-400 text-xl md:text-2xl mb-8">🏆 LEADERBOARD</h1>
        {error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <ul className="space-y-4 text-sm md:text-base">
            {scores.map(score => (
              <li
                key={score.userID}
                className="bg-gray-300 text-black py-3 px-6 border-2 border-black w-[300px] mx-auto"
              >
                {score.username}: {score.score} pts
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
