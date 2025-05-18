
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Player from './Player';
import Score from './Score';
import Obstacle from './Obstacle';

let hit = 0; //測試碰撞次數用

type GameProps = {
  onGameOver: () => void;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean; 
};

export default function Game({onGameOver, score, setScore, isRunning }: GameProps) {
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [screenHeight, setScreenHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );
  const GRAVITY = screenHeight*0.005;
  const JUMP_FORCE = -screenHeight*0.035;
  const GROUND_LEVEL = 0;

 

  const [obstacles, setObstacles] = useState<{ x: number }[]>([]);
  const minGap = 200; // 每個障礙物至少相隔 200px
  const obstacleSpeed = 3;
  


  const handleJump = () => {
    setPlayerY((currentY) => {
      if (Math.abs(currentY - GROUND_LEVEL) < 1e-2) {
        setVelocity(JUMP_FORCE);
      }
      return currentY;
    })
    
  };

  useEffect(() => {
    if (!isRunning) return;

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
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    


    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 100); 

    return () => clearInterval(scoreInterval);
  }, [isRunning]);

  //障礙物生成
  useEffect(() => {
    if (!isRunning) return;
    let lastObstacleX = 1000;
  
    const interval = setInterval(() => {
      const newX = lastObstacleX + minGap + Math.random()*200;
      setObstacles((prev) => [...prev, { x: newX }]);
      lastObstacleX = newX;
    }, 400); // 每 0.4 秒試圖生成一個障礙物
  
    return () => clearInterval(interval);
  }, [isRunning]);

  //移動障礙物
  useEffect(() => {
    if (!isRunning) return;
    const update = () => {
      setObstacles((prev) =>
        prev
          .map((ob) => ({ ...ob, x: ob.x - obstacleSpeed }))
          .filter((ob) => ob.x > -50) // 移除畫面外的障礙物
      );
      requestAnimationFrame(update);
    };
    update();
  }, [isRunning]);

  //碰撞
  useEffect(() => {
    if (!isRunning) return;

    const checkCollision = () => {
      const playerLeft = 40;
      const playerRight = 40 + 64;
      
  
      for (const ob of obstacles) {
        const obLeft = ob.x;
        const obRight = ob.x + 20;
        const obTop = 60; // 障礙物高度
        const obBottom = 0;
  
        const collideX = playerRight > obLeft && playerLeft < obRight;
        const collideY = -playerY < obTop;
  
        if (collideX && collideY) {
          onGameOver(); // 停止遊戲
          hit++;
          ob.x = 1000; //避免重複碰撞導致卡死
          break;
        }
      }
    };
  
    const animation = () => {
      checkCollision();
      requestAnimationFrame(animation);
    };
  
    animation();

    return () => {}
  }, [obstacles, playerY, isRunning]);

  

  return (
    <div
      className="relative w-[80%] h-[80vh] bg-gray-200 overflow-hidden"
      onClick={handleJump}
    >
      <Player y={playerY} screenHeight={screenHeight}/>
      <Score score={score} />
      {obstacles.map((ob, index) => (
        <Obstacle key={index} x={ob.x} />
      ))}
      <div
        className="absolute bottom-22/100 left-0 w-full h-[1vh] bg-gray-700"
      ></div>
    </div>
  );
}