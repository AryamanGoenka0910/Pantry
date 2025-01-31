// app/components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 md:flex md:justify-between md:items-start">
        {/* Left Column: Logo + short description */}
        <div className="mb-8 md:mb-0">
          {/* Logo + Brand name */}
          <div className="flex items-center space-x-2 mb-1">
            {/* Example placeholder for your logo icon */}
            <img src="/logo.svg" alt="Pantry Logo" className="h-16 w-16" /> 
            <span className="text-xl font-semibold text-black font-serif">Pantry</span>
          </div>
          <p className="text-gray-600 max-w-sm">
            Turn your next meal into a hassle-free experience with Pantry.
          </p>
        </div>

        {/* Right Columns: Quick links */}
        <div className="flex flex-wrap gap-8">
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <Link
                    href="/terms"
                    className="hover:text-gray-900"
                >
                    Terms and Conditions
                </Link>
              </li>
              <li>
                <Link 
                    href="/privacy"
                    className="hover:text-gray-900"
                >
                        Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <Link 
                    href="/contact"
                    className="hover:text-gray-900"
                >
                    Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Itineraries */}
          <div>
            <h3 className="font-semibold mb-2">Itineraries</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <Link 
                    href="/community-trips"
                    className="hover:text-gray-900"
                >
                    Start Chatting
                </Link>
              </li>
              <li>
                <Link 
                    href="/"
                    className="hover:text-gray-900"
                >
                    Find a Recipe
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="border-t border-gray-200 py-4 mt-6">
        <div className="max-w-6xl mx-auto px-4 text-gray-500 text-sm">
          © 2024 Pantry. All rights reserved
        </div>
      </div>
    </footer>
  );
}
