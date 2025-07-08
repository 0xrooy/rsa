'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/games`)
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
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎮 Existing Games</h1>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}

      <ul className="space-y-4">
        {games.map((game) => (
          <li
            key={game.gameID}
            className="border border-gray-600 p-4 rounded-xl bg-gray-900"
          >
            <div className="text-lg font-semibold">{game.gameName}</div>
            <div>👤 {game.username}</div>
            <div>🧮 {game.currentScore} pts</div>
            <div>
              🚦 <span className={game.gameStatus === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                {game.gameStatus}
              </span>
            </div>
            <div>📅 {new Date(game.lastUpdated).toLocaleString()}</div>
            <button
              onClick={() => router.push(`/game/${game.gameID}`)}
              className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ▶️ Resume
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
