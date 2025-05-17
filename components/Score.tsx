import React from 'react';

type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  return (
    <div className="absolute top-4 right-4 text-xl font-bold text-black z-10">
      Score: {score}
    </div>
  );
}