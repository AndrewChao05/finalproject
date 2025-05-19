// components/Obstacle.tsx
import React from 'react';

type ObstacleProps = {
  x: number; // 水平位置
  image: string;
  screenHeight: number; // 屏幕高度
  screenWidth: number; // 屏幕寬度
  
};

export default function Obstacle({ x, image, screenHeight, screenWidth }: ObstacleProps) {
  return (
    <img
      src={image}
      alt="obstacle"
      className="absolute bottom-23/100 w-10 h-16"
      style={{
        width: `${screenWidth * 0.03}px`, // 高度的 5%
        height: `${screenHeight * 0.1}px`,
        left: `${x}px`
      }}
    />
  );
}