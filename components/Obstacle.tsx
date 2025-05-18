// components/Obstacle.tsx
import React from 'react';

type ObstacleProps = {
  x: number; // 水平位置
  width?: number;
  height?: number;
};

export default function Obstacle({ x , width = 20, height = 60 }: ObstacleProps) {
  return (
    <div
      className="absolute bottom-22/100 bg-red-500"
      style={{
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}
