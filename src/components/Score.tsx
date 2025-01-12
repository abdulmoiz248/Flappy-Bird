// components/Score.tsx

import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '24px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: 10,
      }}
    >
      Score: {score}
    </div>
  );
};

export default Score;
