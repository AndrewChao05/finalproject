'use client';

import './globals.css';

import React,{ useState } from 'react';

import Game from '../components/Game';
import StartScreen from '../components/StartScreen';
import GameOverScreen from '../components/GameOverScreen';

export default function Home() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gamekey, setGameKey] = useState(0);
  

  const handleStart = () => {
    setScore(0);
    setIsRunning(true);
    setGameState('playing');
    setGameKey(prev => prev + 1);
  };

  const handleGameOver = () => {
    setGameState('gameover');
  };

  return (
    <main className="flex justify-center items-center w-full h-screen bg-gray-100">
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && <Game key={gamekey} onGameOver={handleGameOver} score={score} setScore={setScore} isRunning={isRunning}/>}
      {gameState === 'gameover' && <GameOverScreen score={score} onRestart={handleStart} />} 
    </main>
  );
}