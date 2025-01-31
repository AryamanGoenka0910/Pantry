"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const HamburgerDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="drawer drawer-end" ref={drawerRef}>
      {/* Toggle input */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
  
      {/* Page Content */}
      <div className="drawer-content">
        {/* Hamburger Icon */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button relative"
          onClick={toggleMenu}
        >
          <div
            className="flex flex-col items-center justify-center w-10 h-10 space-y-1 bg-white border-2 border-gray-500 rounded-lg cursor-pointer"
          >
            <span
              className={`block h-1 w-6 bg-gray-800 transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`block h-1 w-6 bg-gray-800 transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-6 bg-gray-800 transition-transform duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </label>
      </div>
  
      {/* Drawer Side */}
      <div className="drawer-side">
        {/* Overlay */}
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={closeMenu}
        ></label>
  
        {/* Sidebar Content */}
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link href="/">Sidebar Item 1</Link>
          </li>
          <li>
            <Link href="/about">Sidebar Item 2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerDrawer;
