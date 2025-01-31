"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import Hamburger from "@/components/Hamburger";

const Header: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Update the state based on the window width
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 790); // Set threshold for small screens (768px)
  };

  useEffect(() => {
    // Set initial value
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 lg:px-24 py-3 backdrop-blur-lg bg-gray-50/70 z-50">
      {isSmallScreen ? (
        // Show Hamburger Menu for Small Screens
        <Hamburger />
      ) : (
        // Show Full Header for Large Screens
        <>
          {/* Left: Logo + Brand Name */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img src="/logo.svg" alt="Pantry Logo" className="h-20 w-20" />
            </Link>
            <Link href="/">
              <span className="text-4xl font-semibold text-black font-serif">
                Pantry
              </span>
            </Link>
          </div>

          {/* Right: Nav items */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/comingsoon"
              className="text-gray-700 hover:text-white hover:bg-black py-2 px-5 rounded-full bg-opacity-0"
            >
              Sign In
            </Link>

            <Link
              href="/comingsoon"
              className="bg-black text-white py-2 px-5 rounded-full hover:bg-gray-800"
            >
              Start Chatting
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
