'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type GameData = {
  gameID: number
  gameName: string
  username: string
  currentScore: number
  gameStatus: string
  lastUpdated: string
  p: number
  q: number
  n: number
  phi: number
  e: number
  d: number
  plaintext: string
  encrypted: string
}

export default function GamePage() {
  const [game, setGame] = useState<GameData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const gameID = params?.id
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/games/${gameID}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setGame(data)
      } catch (err) {
        console.error(err)
        setError('❌ Failed to load game.')
      }
    }

    if (gameID) fetchGame()
  }, [gameID])

  if (error) return <div>{error}</div>
  if (!game) return <div>Loading game...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{game.gameName} - Resume</h1>
      <p>👤 {game.username}</p>
      <p>Score: {game.currentScore}</p>
      <p>Status: {game.gameStatus}</p>
      <hr className="my-4" />
      <p>RSA Details:</p>
      <ul className="text-sm space-y-1">
        <li>p = {game.p}, q = {game.q}, n = {game.n}</li>
        <li>phi = {game.phi}</li>
        <li>e = {game.e}, d = {game.d}</li>
        <li>plaintext = {game.plaintext}</li>
        <li>encrypted = {game.encrypted}</li>
      </ul>
      {/* 🚀 You can inject this into your game.html logic or rebuild game stages here */}
    </div>
  )
}
