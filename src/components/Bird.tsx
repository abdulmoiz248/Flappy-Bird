'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import GameOverModal from './GameOverModal'
import Pipe from './Pipe'
import Score from './Score'

interface PipeData {
  x: number;
  topHeight: number;
  bottomHeight: number;
}

export default function Bird() {
  const [position, setPosition] = useState({ x: 50, y: 200 });
  const [falling, setFalling] = useState(true);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const [score, setScore] = useState(0);
  const birdRef = useRef<HTMLDivElement>(null);

  const gravity = 5;
  const jumpHeight = -100;
  const forwardSpeed = 12;
  const pipeWidth = 120; 
  const pipeGap = 220; 
  const pipesSpacing = 450; 
  const minPipeHeight = 100;
  
  const collisionBuffer = 0; 

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, [mounted]);

  const generatePipes = useCallback(() => {
    const newPipes: PipeData[] = [];
    const numPipes = 5;
    
    for (let i = 0; i < numPipes; i++) {
      const availableHeight = screenSize.height - pipeGap;
      const minHeight = minPipeHeight;
      const maxHeight = availableHeight - minPipeHeight;
      
      const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
      newPipes.push({
        x: screenSize.width + (i * pipesSpacing),
        topHeight,
        bottomHeight: availableHeight - topHeight,
      });
    }

    setPipes(newPipes);
  }, [screenSize.height, screenSize.width]);

  useEffect(() => {
    if (mounted && screenSize.width > 0) {
      generatePipes();
    }
  }, [mounted, screenSize, generatePipes]);

  useEffect(() => {
    if (gameOver || !mounted) return;

    const gameLoop = setInterval(() => {
      setPosition(prev => {
        const birdWidth = birdRef.current?.offsetWidth || 50;
        const birdHeight = birdRef.current?.offsetHeight || 50;
           
        const newY = falling ? prev.y + gravity : prev.y;

        
        if (newY <= 0 || newY >= screenSize.height - birdHeight) {
          
          setGameOver(true);
          return prev;
        }

        const collision = pipes.some(pipe => {
        
          const birdLeft = position.x + collisionBuffer;
          const birdRight = position.x + birdWidth - collisionBuffer;
          const birdTop = newY + collisionBuffer;
          const birdBottom = newY + birdHeight - collisionBuffer;

          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + pipeWidth;
          
         
          const horizontalOverlap = birdRight > pipeLeft && birdLeft < pipeRight;
          
          if (!horizontalOverlap) return false;

          
          const hittingTopPipe = birdTop < pipe.topHeight + collisionBuffer;
          const hittingBottomPipe = birdBottom > screenSize.height - pipe.bottomHeight - collisionBuffer;

          return hittingTopPipe || hittingBottomPipe;
        });

        if (collision) {
        
          setGameOver(true);
          return prev;
        }
        
        return { ...prev, y: newY };
      });

      
      setPipes(prevPipes => {
        const updatedPipes = prevPipes.map(pipe => ({
          ...pipe,
          x: pipe.x - forwardSpeed,
        }));

        if (updatedPipes[0].x + pipeWidth < 0) {
          updatedPipes.shift();
          const lastPipe = updatedPipes[updatedPipes.length - 1];
          const availableHeight = screenSize.height - pipeGap;
          const topHeight = Math.random() * (availableHeight - 2 * minPipeHeight) + minPipeHeight;
          
          updatedPipes.push({
            x: lastPipe.x + pipesSpacing,
            topHeight,
            bottomHeight: availableHeight - topHeight,
          });
          setScore(prevScore => prevScore + 0.5);
        }
       
        return updatedPipes;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [falling, screenSize, gameOver, mounted, pipes, position.x, position.y]);

  const handleJump = useCallback(() => {
    if (gameOver) return;
    setPosition(prev => ({ ...prev, y: Math.max(0, prev.y + jumpHeight) }));
    setFalling(false);
    setTimeout(() => setFalling(true), 300);
  }, [gameOver]);

  useEffect(() => {
    if (!mounted) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [mounted, handleJump]);

  const restartGame = () => {
    setPosition({ x: 50, y: 200 });
    setScore(0);
    setFalling(true);
    setGameOver(false);
    generatePipes();
  };

  if (!mounted) return null;

  return (
    <>
      <div 
        onClick={handleJump}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          cursor: 'pointer',
    
        }}
      >
        {pipes.map((pipe, index) => (
          <React.Fragment key={index}>
            <Pipe x={pipe.x} height={pipe.topHeight} isTop={true} />
            <Pipe x={pipe.x} height={pipe.bottomHeight} isTop={false} />
          </React.Fragment>
        ))}
        <div
          ref={birdRef}
          style={{
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            transition: 'top 0.2s ease-out',
            width: '50px',
            height: '50px',
          }}
        >
          <Image 
            src="/bird.png" 
            alt="bird" 
            width={70} 
            height={70}
            style={{
             
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        
      </div>
      <Score score={score} />
      {gameOver && <GameOverModal onRestart={restartGame} />}
    </>
  );
}

