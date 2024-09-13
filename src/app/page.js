'use client'

import CursorAnimation from "@/components/cursorAnimation";
import { useEffect, useState } from "react";
import AnimationSequence from "@/components/animationSequence";


export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);
  // const [showCursor, setShowCursor] = useState(false);

  // Function to handle when animation is complete
  const handleAnimationComplete = () => {
    setShowCursor(true); // Show cursor when animation is done
  };


  // Function to handle when animation is complete
  const handleAnimationCompleteHeader = () => {
    setAnimationComplete(true); // Set animationComplete to true when animation is done
  };

  
  return (
    <main className={`w-full h-screen ${animationComplete ? 'overflow-y-scroll' : '' }  overflow-hidden bg-[#F2EFE9]`}>
      {/* <CursorAnimation /> */}

      {/* Render AnimationSequence and pass handleAnimationComplete */}
      <AnimationSequence onComplete={handleAnimationCompleteHeader} />

      {/* Render additional content only after animation is complete */}
      {animationComplete && (
        <>
          <div className="border-2 border-[green] w-full h-screen">

          </div>
        </>
      )}

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