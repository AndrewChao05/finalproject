import React from 'react';

type PlayerProps = {
    y: number;
};

export default function Player({ y }: PlayerProps) {
  return (
    <div
      className="absolute bottom-0 left-10 w-16 h-16 bg-green-500 rounded"
      style={{ transform: `translateY(-${y}px)` }}
    ></div>
  );
}