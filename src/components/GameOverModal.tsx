'use client'
import React from 'react'

interface GameOverModalProps {
  onRestart: () => void;
}

export default function GameOverModal({ onRestart }: GameOverModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over</h2>
        <p className="mb-4">You touched the boundary!</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Restart Game
        </button>
      </div>
    </div>
  )
}

