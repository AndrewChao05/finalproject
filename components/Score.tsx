import React from 'react';

type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  return (
    <div className="absolute top-[3vh] right-[3vw] text-[2vw] font-bold text-black z-10">
      Score: {score}
    </div>
  );
}