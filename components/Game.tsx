
'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Player from './Player';
import Score from './Score';
import Obstacle from './Obstacle';



type GameProps = {
  onGameOver: () => void;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  highScore: number;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean; 
  screenHeight: number;
  screenWidth: number;
};

export default function Game({onGameOver, score, setScore, highScore, setHighScore, isRunning, screenHeight, screenWidth }: GameProps) {
  const [playerY, setPlayerY] = useState(0);
  const velocityRef = useRef(0);
  
  const GRAVITY = screenHeight*0.0025;
  const JUMP_FORCE = -screenHeight*0.043;
  const GROUND_LEVEL = 0;

 

  const [obstacles, setObstacles] = useState<{ x: number,image: string, screenHeight: number }[]>([]);
  const minGap = screenWidth*0.5; // 障礙物之間的最小距離
  const obstacleSpeed = screenWidth*0.004; // 障礙物移動速度
  


  const handleJump = () => {
    setPlayerY((currentY) => {
      if (Math.abs(currentY - GROUND_LEVEL) < 1e-2) {
        velocityRef.current = JUMP_FORCE;
      }
      return currentY;
    })
    
  };

  useEffect(() => {
  if (!isRunning) return;

  let animationFrameId: number;
  let lastTime: number | null = null;

  const loop = (time: number) => {
    if (lastTime !== null) {
      

      velocityRef.current += GRAVITY;
      setPlayerY((y) => {
        let newY = y + velocityRef.current;
        if (newY > GROUND_LEVEL) {
          newY = GROUND_LEVEL;
          velocityRef.current = 0;
          setPlayerY(GROUND_LEVEL);
        }
        return newY;
      });
    }
    lastTime = time;
    animationFrameId = requestAnimationFrame(loop);
  };

  animationFrameId = requestAnimationFrame(loop);

  return () => cancelAnimationFrame(animationFrameId);
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
    
    const lastObstacleX = obstacles.length > 0
    ? obstacles[obstacles.length - 1].x
    : screenHeight*1.5; // 如果還沒有障礙物，就從 0 開始
  
    const interval = setInterval(() => {
      const newX = lastObstacleX + minGap + Math.random()*200;
      const randomImage = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
      setObstacles((prev) => [...prev, { x: newX,  image: randomImage, screenHeight: screenHeight }]);
    
    }, screenHeight * 1.0); // 每 1 秒生成一個障礙物
  
    return () => clearInterval(interval);
  }, [isRunning]);


  useEffect(() => {
    if (!isRunning) return;
  
    let animationFrameId: number;
    let lastTime = performance.now();
  
    const update = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
  
      setObstacles((prev) =>
        prev
          .map((ob) => ({
            ...ob,
            x: ob.x - obstacleSpeed * (delta / 8),
          }))
          .filter((ob) => ob.x > -screenHeight * 0.1)
      );
  
      animationFrameId = requestAnimationFrame(update);
    };
  
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, screenHeight]);

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
      <Player y={playerY} screenHeight={screenHeight} screenWidth={screenWidth}/>
      <Score score={score} highScore={highScore}/>
      {obstacles.map((ob, index) => (
        <Obstacle key={index} x={ob.x} image={ob.image} screenHeight={screenHeight} screenWidth={screenWidth} />
      ))}
      <div
        className="absolute bottom-22/100 left-0 w-full h-[1vh] bg-gray-700"
      ></div>
    </div>
  );
}
