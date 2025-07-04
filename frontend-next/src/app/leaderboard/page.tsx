'use client'
import { useEffect, useState } from 'react'

type Score = {
  id: number
  username: string
  points: number
}

export default function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard')
      .then(res => res.json())
      .then(data => setScores(data))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-indigo-900 font-press-start text-center text-white p-6">
      <div>
        <h1 className="text-green-400 text-xl md:text-2xl mb-8">LEADERBD hello there</h1>
        <ul className="space-y-4 text-sm md:text-base">
          {scores.map(score => (
            <li
              key={score.id}
              className="bg-gray-300 text-black py-3 px-6 border-2 border-black w-[300px] mx-auto"
            >
              {score.username}: {score.points} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
