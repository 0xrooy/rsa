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
  const [loading, setLoading] = useState(true)

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
        setError('❌ Failed to load leaderboard. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [apiUrl])

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="stage-indicator">Stage 1</div>
        <h1 className="game-title">🏆 LEADERBOARD</h1>
        <div className="timer-display">LIVE</div>
      </div>

      <div className="game-content">
        {loading ? (
          <div className="info-display">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="stage-content">
            <h2 className="stage-title">Top Scorers</h2>
            <ul className="text-white text-xs space-y-4">
              {scores.map((score, index) => (
                <li
                  key={score.userID}
                  className="difficulty-card"
                >
                  #{index + 1} — {score.username}: {score.score} pts
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
