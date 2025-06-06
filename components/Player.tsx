import React from 'react';
import { useState, useEffect } from 'react';

type PlayerProps = {
    y: number;
    screenHeight: number;
    screenWidth: number;
};

export default function Player({ y, screenHeight, screenWidth }: PlayerProps) {
  const [runningImage, setRunningImage] = useState('/1.png');
  const setIsTest1 = useState(true)[1];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTest1((prev) => {
        const newFlag = !prev;
        setRunningImage(newFlag ? '/1.png' : '/2.png');
        return newFlag;
      });
    }, 300); 

    return () => clearInterval(interval);
  }, []);

  const isJumping = y < 0;
  const imageSrc = isJumping ? '/3.png' : runningImage;

  return (
    <img
      src = {imageSrc}
      alt = "Player"

      className="absolute bottom-23/100 left-[3vw]"
      style={{ transform: `translateY(${y*0.8}px)`, width: screenWidth*0.09 }}

    />
  );
}

