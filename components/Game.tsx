
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Player from './Player';

export default function Game() {
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const GRAVITY = 2;
  const JUMP_FORCE = -15;
  const GROUND_LEVEL = 0;

  const handleJump = () => {
    setPlayerY((currentY) => {
      if (Math.abs(currentY - GROUND_LEVEL) < 1e-2) {
        setVelocity(JUMP_FORCE);
      }
      return currentY;
    })
    
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setVelocity((v) => {
        setPlayerY((y) => {
          let newY = y + v;
          if (newY > GROUND_LEVEL) newY = GROUND_LEVEL;
          return newY;
        });
        return v + GRAVITY;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-white overflow-hidden"
      onClick={handleJump}
      style={{ position: 'relative', width: '80%', height: '80vh', backgroundColor: '#eee' }}
    >
      <Player y={playerY} />
      <div
        className="absolute bottom-22/100 left-0 w-full h-4 bg-gray-700"
      ></div>
    </div>
  );
}