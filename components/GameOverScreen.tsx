'use client';

import React, { useEffect } from 'react';

type GameOverScreenProps = {
  score: number;
  onRestart: () => void;
};

export default function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.code === 'Space') {
            onRestart();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [onRestart]);

    return (
        <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white z-50"
        onClick={onRestart}
        >
        <h1 className="text-4xl font-bold mb-4">You Flunked!</h1>
        <p className="text-2xl mb-4">Score: {score}</p>
        <p className="text-lg animate-bounce">Tap Space or Click to Restart</p>
        </div>
    );
}
