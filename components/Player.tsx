import React from 'react';

type PlayerProps = {
    y: number;
};

export default function Player({ y }: PlayerProps) {
  console.log('PlayerY:', y);

  return (
    <div
      className="absolute left-10 w-16 h-16 bg-green-500 rounded"
      style={{ bottom: `${-y+110}px` }}
    />
  );
}

