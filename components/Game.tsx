
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Player from './Player';

export default function Game() {
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const GRAVITY = 1;
  const JUMP_FORCE = -15;
  const GROUND_LEVEL = 0;

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPlayerY((y) => {
        let newY = y + velocity;
        if (newY > GROUND_LEVEL) newY = GROUND_LEVEL;
        return newY;
      });
      setVelocity((v) => v + GRAVITY);
    }, 50);

    return () => clearInterval(gameLoop);
  }, [velocity]);

  const handleJump = () => {
    if (playerY === GROUND_LEVEL) {
      setVelocity(JUMP_FORCE);
    }
  };

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