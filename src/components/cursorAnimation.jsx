'use client'

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CursorAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        border: '2px solid green',
        position: 'absolute',
        top: mousePosition.y,
        left: mousePosition.x,
        width: '50px',
        height: '50px',
        backgroundColor: 'red',
        borderRadius: '50%',
        zIndex: '1000',
      }}
      animate={{
        x: mousePosition.x - mousePosition.x,
        y: mousePosition.y - mousePosition.y,
      }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default CursorAnimation;