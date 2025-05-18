'use client';

import React, { useEffect } from 'react';

export default function StartScreen({ onStart }: { onStart: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white text-center cursor-pointer"
      onClick={onStart}
    >
      <h1 className="text-6xl font-bold mb-4">EE RUN</h1>
      <p className="text-xl animate-bounce">Tap Space or Click to Start</p>
    </div>
  );
}