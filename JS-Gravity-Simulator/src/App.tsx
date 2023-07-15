import React, { useState, useEffect } from 'react';

const GRAVITY = 0.1;  // Gravity acceleration
const ENERGY_LOSS = 0.8;  // Energy loss during bounce
const INITIAL_VELOCITY = 0;  // Initial velocity
const INITIAL_TOP = 0;  // Initial top position
const INITIAL_LEFT = 0;  // Initial left position

const App= () => {
  const [top, setTop] = useState(INITIAL_TOP);
  const [left, setLeft] = useState(INITIAL_LEFT);
  const [velocity, setVelocity] = useState(INITIAL_VELOCITY);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Update velocity and position
      const newVelocity = velocity + GRAVITY;
      const newTop = top + newVelocity;
      setVelocity(newVelocity);
      setTop(newTop);

      if (newTop >= window.innerHeight) {
        // Ball hits the surface, bounce back
        setVelocity(-newVelocity * ENERGY_LOSS);
      }

      if (newTop <= 0) {
        // Ball runs out of energy, reset to initial state
        setTop(INITIAL_TOP);
        setLeft(INITIAL_LEFT);
        setVelocity(INITIAL_VELOCITY);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      // Clean up animation frame
      cancelAnimationFrame(animationFrameId);
    };
  }, [top, velocity]);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'red',
      }} 
    />
  );
};

export default App;
