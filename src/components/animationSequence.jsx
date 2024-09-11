"use client";

// components/AnimationSequence.js
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
// import { BsPlayCircle } from "react-icons/bs";
import { BsPlayCircle, BsList } from "react-icons/bs"; // Add hamburger icon

const AnimationSequence = () => {
  const [count, setCount] = useState(1);
  const textRef = useRef(null);
  const videoRef = useRef(null); // Ref for the video container
  const closeBtnRef = useRef(null); // Ref for the close button
  // const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const menuRef = useRef(null); // Ref for the hidden menu
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the loader dots (orbiting circles)
    gsap.to(".circle1", {
      duration: 3,
      rotate: 360,
      ease: "none",
      repeat: -1, // Infinite loop
      transformOrigin: "50% 100px", // Orbit around the loader's center
    });

    gsap.to(".circle2", {
      duration: 3,
      rotate: -360,
      ease: "none",
      repeat: -1, // Infinite loop
      transformOrigin: "50% -100px", // Orbit in the opposite direction
    });

    // Loader counting from 1 to 100
    gsap.to(
      {},
      {
        duration: 3, // Duration for counting
        onUpdate: function () {
          setCount((prev) => (prev < 100 ? prev + 1 : 100)); // Increment counter
        },
      }
    );

    // Step 1: Loader fades out and triangle becomes visible
    tl.to(".loader-container", {
      duration: 2,
      delay: 2, // Adjust delay as needed
      opacity: 0,
      scale: 0.5, // Shrink the loader if needed
      ease: "power2.inOut",
      onComplete: () => {
        // Ensure triangle is visible after loader animation completes
        gsap.set(".animated-shape", { display: "block" });
      },
    });

    // Step 2: Show triangle first
    tl.to(".animated-shape", {
      duration: 0.5,
      width: "10vw",
      height: "10vh",
      borderLeft: "5vw solid transparent",
      borderRight: "5vw solid transparent",
      borderBottom: "13vh solid transparent",
      top: "50%",
      left: "50%",
      ease: "power2.inOut",
      borderRadius: "5vw",
      rotate: "45deg",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // Clip the image to the triangle shape
    });

    // Step 3: Wait for a few seconds before transitioning to square
    tl.to({}, { duration: 0.6 }); // Pause for 2 seconds

    // Step 4: Transition from triangle to full-screen square
    tl.to(".animated-shape", {
      duration: 0.6,
      width: "100vw",
      height: "100vh",
      borderLeft: "0px",
      borderRight: "0px",
      borderBottom: "100vh solid transparent",
      borderRadius: "10%", // Start with rounded corners and end with sharp corners
      top: "0",
      left: "0",
      transform: "none",
      ease: "power2.inOut",
      onUpdate: function () {
        // Gradually change border-radius to create smooth transition
        const progress = tl.progress(); // Get the progress of the timeline
        const borderRadiusValue = progress < 0.5 ? 50 * (2 * progress) : 0; // Smooth transition
        gsap.set(".animated-shape", {
          borderRadius: `${borderRadiusValue}%`,
        });
      },
      clipPath: "",
      onComplete: () => {
        // Reveal and animate the text
        gsap.set(".welcome-text", { opacity: 1, scale: 1 }); // Ensure the text is visible
        const splitText = new SplitType(textRef.current, { types: "chars" });

        // Animate the split characters
        gsap.fromTo(
          ".char",
          {
            y: "100%",
            opacity: 0,
          },
          {
            duration: 0.6,
            y: "0%",
            opacity: 1,
            stagger: 0.05,
            ease: "power2.out",
          }
        );

        // Animate the menu from top to top-right side when the page loads
        gsap.fromTo(
          ".menu-container",
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Animate the logo from top to top-left side when the page loads
        gsap.fromTo(
          ".logo-container",
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Video flip-up animation
        gsap.fromTo(
          ".video-container",
          // videoContainerRef.current,
          { y: "100%", opacity: 0 },
          {
            duration: 1,
            y: "0%",
            opacity: 1,
            ease: "power2.out",
            // delay: 2, // Delay to start after other animations
          }
        );
      },
    });

    // Expand video container on click
    const handleVideoClick = () => {
      gsap.to(videoRef.current, {
        position: "fixed",
        duration: 0.6,
        right: "unset",
        width: "98%",
        height: "95%",
        ease: "power2.out",
        zIndex: 100, // Ensure the video container is on top
        onComplete: () => {
          gsap.to(".video-close-btn", { opacity: 1, scale: 1 });
          gsap.to(".play_btn", { opacity: 0, scale: 0 });
        },
      });
    };

    // Add event listeners for video container and close button
    const videoElement = videoRef.current;
    const closeBtnElement = closeBtnRef.current;
    if (videoElement) {
      videoElement.addEventListener("click", handleVideoClick);
    }
    if (closeBtnElement) {
      closeBtnElement.addEventListener("click", handleCloseClick);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("click", handleVideoClick);
      }
      if (closeBtnElement) {
        closeBtnElement.removeEventListener("click", handleCloseClick);
      }
    };
  }, []);

  // Close video container
  const handleCloseClick = () => {
    gsap.to(videoRef.current, {
      duration: 0.6,
      right: "30px",
      width: "26rem",
      height: "19rem",
      ease: "power2.inOut",
      zIndex: 1, // Reset the z-index
      onComplete: () => {
        gsap.to(".video-close-btn", { opacity: 0, scale: 0 });
        gsap.to(".play_btn", { opacity: 1, scale: 1 });
      },
    });
  };

  // Open menu bar horizontally
  const handleMouseEnter = () => {
    gsap.to(".menu-container", {
      width: "27rem",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(".line", {
      opacity: 0,
      display: "none",
      duration: 0.5,
      ease: "power2.out",
      onComplete: ()=>{
        gsap.to(".menu-list", {
          opacity: 1,
          y: 0, 
          display: "flex",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  };
  const handleMouseLeave = () => {
    gsap.to(".menu-container", {
      width: "13rem",
      duration: 0.5,
      ease: "power2.out",
      delay: 0.5, // Delay to start after the previous animation
    });
    gsap.to(".menu-list", {
      opacity: 0,
      y: 100, 
      display: "none",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".line", {
          opacity: 1,
          display: "block",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div
      className="header-container border-2 border-[orange] h-full flex items-center justify-center"
      style={{ position: "relative", width: "100vw", overflow: "hidden" }}
    >
      {/* Custom Loader Animation */}
      <div
        className="loader-container"
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          // border: '2px solid #ccc', // Thin border
          borderRadius: "50%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        {/* Logo in the center */}
        <div
          className="logo p-5"
          style={{
            position: "absolute",
            fontSize: "1.5em",
            color: "#333",
            zIndex: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Ensure logo is centered
          }}
        >
          LOGO {/* Replace with your logo */}
        </div>

        {/* Orbiting Circles */}
        <div
          className="orbit-container"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          {/* Circle 1 */}
          <div
            className="circle1"
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              backgroundColor: "#D7D1C6", // Circle color
              borderRadius: "50%",
              top: "0", // Position at the top of the loader
              left: "50%",
              transform: "translateX(-50%)",
            }}
          ></div>

          {/* Circle 2 */}
          <div
            className="circle2"
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              backgroundColor: "#D7D1C6", // Circle color
              borderRadius: "50%",
              bottom: "0", // Position at the bottom of the loader
              left: "50%",
              transform: "translateX(-50%)",
            }}
          ></div>
        </div>

        {/* Loader Counting */}
        <div
          className="loader-counter"
          style={{
            position: "absolute",
            top: "20rem", // Position below the loader
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.8em",
            color: "#666",
          }}
        >
          {count}/100
        </div>
      </div>

      {/* logo div */}
      <div
        className="logo-container fixed top-5 left-3 m-4 bg-white rounded-2xl p-1 shadow-lg flex items-center justify-between opacity-0 z-50"
        style={{ width: "5rem", height: "5rem" }}
      >
        
      </div>

      {/* Triangle to Square Animation */}
      <div
        className="animated-shape"
        style={{
          position: "absolute",
          width: "0",
          height: "0",
          borderLeft: "0px solid transparent",
          borderRight: "0px solid transparent",
          borderBottom: "0px solid transparent",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "none", // Initially hidden
          zIndex: 0,
          backgroundImage: "url(/bg.jpg)",
        }}
      >
        <div className="border--2 border-[red] bg-transparent w-full h-[100vh] relative flex justify-center">
          <img
            className="absolute relativee bottom--0 top--[-10rem] left-0 object-cover w-full h-full scale-105 z-[4]"
            src="/bg-2.png"
            alt="img.png"
          />

          {/* Welcome Text */}
          <div
            className="welcome-text font-bold text-center leading-[15rem] lowercase"
            style={{
              fontSize: "20rem",
              color: "#fff",
              opacity: 0, // Initially hidden
              scale: 0.8, // Start with scaled down
              zIndex: 2,
              willChange: "opacity, transform", // For smoother animation
              position: "absolute", // Position text absolutely
              top: "32%",
              left: "42%",
              transform: "translate(-50%, -50%)",
            }}
            ref={textRef} // Attach ref here
          >
            {/* Wrap each word in a block element */}
            <div>
              {Array.from("Meet").map((char, index) => (
                <span
                  key={index}
                  className="char"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              ))}
            </div>
            <br />
            <div>
              {Array.from("Pebble").map((char, index) => (
                <span
                  key={index}
                  className="char"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          <img
            src="/bg-3.jpg"
            alt="img.png"
            className="absolute bottom-0 top--[-10rem] left-0 object-cover w-full h-full scale-105 z-0"
          />

          <img
            src="/bg-f.png"
            alt="alt"
            className="absolute bottom-0 top--[-10rem] left-0 object-cover w-full h-full scale-105 z-[5]"
          />
        </div>
      </div>

      {/* Hamburger Menu */}
      <div
        className="menu-container fixed top-5 right-3 m-4 bg-white rounded-2xl p-1 shadow-lg flex items-center justify-between opacity-0"
        style={{ width: "13rem", height: "5rem" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hamburger Icon */}
        <div className="hamburger p-3 cursor-pointer overflow-hidden">
          <div className="line bg-gray-700 h-[2px] w-5 mb-1"></div>
          <div className="line bg-gray-700 h-[2px] w-5 mb-1"></div>
          <div className="line bg-gray-700 h-[2px] w-5"></div>

          <div className="menu-list text-[#000] text-sm gap-4 hidden translate-y-[100%]">
            <div>Product</div>
            <div>App</div>
            <div>Company</div>
            <div>Community</div>
          </div>
        </div>

        <div
          className="menu-bar bg-[#D7D1C6] rounded-xl flex items-center justify-center px-4 overflow-hidden cursor-pointer"
          style={{ minWidth: "9rem", height: "100%" }}
        >
          <span className="font-medium text-sm text-[#000]">PREORDER</span>
        </div>
      </div>

      {/* Video Container */}
      <div
        className="video-container"
        ref={videoRef}
        style={{
          border: "3px solid #fff",
          borderRadius: "1rem",
          position: "absolute",
          bottom: "20px",
          right: "30px",
          width: "26rem",
          height: "19rem",
          background: "#000",
          cursor: "pointer",
          overflow: "hidden",
          zIndex: 1,
          opacity: "0",
        }}
      >
        <video
          src="/pebble.mp4"
          autoPlay
          muted
          loop
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Close Button */}
        <div
          className="video-close-btn"
          ref={closeBtnRef}
          onClick={handleCloseClick}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "30px",
            height: "30px",
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: "0",
            scale: 0,
            zIndex: 2,
            transition: "opacity 0.1s ease, transform 0.1s ease",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>
            ×
          </span>
        </div>

        <div className="play_btn w-full h-full absolute top-[0%] left-[0%] flex justify-center items-center opacity-0 hover:opacity-[1] transition-all">
          <BsPlayCircle className="text-[#fff] text-7xl font-bold" />
        </div>
      </div>
    </div>
  );
};

export default AnimationSequence;
