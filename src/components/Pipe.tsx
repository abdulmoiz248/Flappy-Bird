import React from 'react';
import Image from 'next/image';

interface PipeProps {
  x: number;
  height: number;
  isTop: boolean;
}

const Pipe: React.FC<PipeProps> = ({ x, height, isTop }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: isTop ? 0 : undefined,
        bottom: isTop ? undefined : 0,
        height: `${height}px`,
        width: '120px', 
        overflow: 'hidden',
     
      }}
    >
      <Image 
        src="/p.png" 
        alt="pipe" 
        width={120}
        height={1000}
        style={{
          objectFit: 'cover',
          transform: isTop ? 'rotate(180deg)' : 'none',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default Pipe;
