
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
  highScore: number;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean; 
};

export default function Game({onGameOver, score, setScore, highScore, setHighScore, isRunning }: GameProps) {
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [screenHeight, setScreenHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );
  const GRAVITY = screenHeight*0.005;
  const JUMP_FORCE = -screenHeight*0.035;
  const GROUND_LEVEL = 0;

 

  const [obstacles, setObstacles] = useState<{ x: number }[]>([]);
  const minGap = screenHeight*0.2; // 障礙物之間的最小距離
  const obstacleSpeed = screenHeight*0.005; // 障礙物移動速度
  


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
  const obstacleImages = [
    '/capacitor.png',
    '/resistor.png',
    '/inductor.png',
  ];

  useEffect(() => {
    if (!isRunning) return;
    let lastObstacleX = 1000;
  
    const interval = setInterval(() => {
      const newX = lastObstacleX + minGap + Math.random()*200;
      const randomImage = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
      setObstacles((prev) => [...prev, { x: newX,  image: randomImage}]);
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
      const playerLeft = screenHeight * 0.045; // 位置也可以調整成比例
      const playerRight = playerLeft + screenHeight * 0.08;
      const playerTop = -playerY;

      for (const ob of obstacles) {
        const obLeft = ob.x - screenHeight * 0.045; // 障礙物的左邊界
        const obRight = ob.x + screenHeight * 0.045;
        const obTop = screenHeight * 0.1;

        const collideX = playerRight > obLeft && playerLeft < obRight;
        const collideY = playerTop < obTop;

        if (collideX && collideY) {
          if(score > highScore){
            setHighScore(score);
          }
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
      <Score score={score} highScore={highScore}/>
      {obstacles.map((ob, index) => (
        <Obstacle key={index} x={ob.x} image={ob.image} screenHeight={screenHeight} />
      ))}
      <div
        className="absolute bottom-22/100 left-0 w-full h-[1vh] bg-gray-700"
      ></div>
    </div>
  );
}