import React from 'react';

type ScoreProps = {
  score: number;
  highScore: number;
};

export default function Score({ score, highScore }: ScoreProps) {
  return (
    <>
      <div className="absolute top-[3vh] right-[3vw] text-[2vw] font-bold text-black z-10">
        Highest Score : {highScore}
      </div>
      <div className="absolute top-[9vh] right-[3vw] text-[2vw] font-bold text-black z-10">
        Score : {score}
      </div>
    </>
  );
}