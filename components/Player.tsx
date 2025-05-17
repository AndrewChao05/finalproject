import React from 'react';
import { useState, useEffect } from 'react';

type PlayerProps = {
    y: number;
};

export default function Player({ y }: PlayerProps) {
  const [runningImage, setRunningImage] = useState('/test1.png');
  const [isTest1, setIsTest1] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTest1((prev) => {
        const newFlag = !prev;
        setRunningImage(newFlag ? '/test1.png' : '/test2.png');
        return newFlag;
      });
    }, 300); 

    return () => clearInterval(interval);
  }, []);

  const isJumping = y < 0;
  const imageSrc = isJumping ? '/test3.png' : runningImage;

  return (
    <img
      src = {imageSrc}
      alt = "Player"
      className="absolute left-10 w-24 h-24"
      style={{ bottom: `${-y+110}px` }}
    />
  );
}

