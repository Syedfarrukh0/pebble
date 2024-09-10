'use client'

import CursorAnimation from "@/components/cursorAnimation";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import AnimationSequence from "@/components/animationSequence";


export default function Home() {
  // const [showCursor, setShowCursor] = useState(false);

  // Function to handle when animation is complete
  const handleAnimationComplete = () => {
    setShowCursor(true); // Show cursor when animation is done
  };

  // Hide the cursor initially, and show after zoom animation
  // useEffect(() => {
  //   if (showCursor) {
  //     document.body.style.cursor = 'default'; // Set default cursor
  //   } else {
  //     document.body.style.cursor = 'none'; // Hide cursor initially
  //   }
  // }, [showCursor]);

  return (
    <main className="w-full h-screen overflow-hidden bg-[#F2EFE9]">
      {/* <CursorAnimation /> */}
      <AnimationSequence />


      {/* <motion.div
        className="border-2 border-[red] w--full h-screen relativee"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        // transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
        transition={{
          duration: 1.5,   // Duration of the animation
          ease: [0.42, 0, 0.58, 1], // Custom easing for slow start
          delay: 1, // Delay
        }}
        onAnimationComplete={handleAnimationComplete} // Trigger when zoom is done
        style={{
          width: 'w-full',
          height: 'h-full',
          borderLeft: '150px solid transparent',
          borderRight: '150px solid transparent',
          // borderBottom: '300px solid blue',
          backgroundColor: 'yellow',
          borderRadius: '20px', // Rounded corners
          margin: 'auto',
          position: 'relative',
          // top: '20vh',
        }}
      >
        <div className="border-2 border-[blue] absolute left-0 w-[30%] h-full"></div>
        <div className="border-2 border-[blue] absolute right-0 w-[30%] h-full"></div>
        <div className="border-2 border-[pink] absolute bottom-0 w-full h-[30%]"></div>
      </motion.div>  */}
    </main>
  );
}
