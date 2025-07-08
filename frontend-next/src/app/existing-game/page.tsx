'use client'

import { useEffect, useState } from 'react'

type Game = {
  gameID: number
  gameName: string
  username: string
  currentScore: number
  gameStatus: string
  lastUpdated: string
}

export default function ExistingGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/games`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setGames(data)
      } catch (err) {
        console.error(err)
        setError('❌ Failed to load existing games.')
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [apiUrl])

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="stage-indicator">Load Save</div>
        <h1 className="game-title">🕹️ EXISTING GAMES</h1>
        <div className="timer-display">LIVE</div>
      </div>

      <div className="game-content">
        {loading ? (
          <div className="info-display">Loading games...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : games.length === 0 ? (
          <div className="info-display">No saved games found.</div>
        ) : (
          <div className="stage-content">
            <h2 className="stage-title">Your Games</h2>
            <ul className="text-white text-sm space-y-4">
              {games.map((game) => (
                <li
                  key={game.gameID}
                  className="difficulty-card p-4 border border-gray-500 rounded-xl bg-black bg-opacity-20"
                >
                  <div><strong>🎮 {game.gameName}</strong></div>
                  <div>👤 {game.username}</div>
                  <div>🧮 {game.currentScore} pts</div>
                  <div>
                    🚦 Status:{' '}
                    <span className={game.gameStatus === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                      {game.gameStatus}
                    </span>
                  </div>
                  <div>📅 {new Date(game.lastUpdated).toLocaleString()}</div>

                  {/* Optional: Resume Button Placeholder */}
                  {/* <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    ▶️ Resume
                  </button> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
