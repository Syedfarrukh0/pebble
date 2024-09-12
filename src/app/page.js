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

  
  return (
    <main className="w-full h-screen overflow-hidden bg-[#F2EFE9]">
      {/* <CursorAnimation /> */}
      <AnimationSequence />

    </main>
  );

  
}
// Hide the cursor initially, and show after zoom animation
// useEffect(() => {
//   if (showCursor) {
//     document.body.style.cursor = 'default'; // Set default cursor
//   } else {
//     document.body.style.cursor = 'none'; // Hide cursor initially
//   }
// }, [showCursor]);
