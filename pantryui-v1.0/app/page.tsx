// pages/index.tsx
"use client";

import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';

import Link from "next/link";
import HomePageCard from "@/components/HomePageCard";
import GetStartedButton from "@/components/GetStartedButton";
import ReadMoreButton from "@/components/ReadMoreButton";
import SearchBar from "@/components/SearchBar";


export default function Home() {
  return (
    <>
    <div className="border border-red-200 h-dvh bg-gray-50 p-8 flex flex-col items-center">
      <header className="text-center my-10 mt-32">
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            2000,
            'Fridge to Counter, Optimized', // initially rendered starting point
            2000,
            'Fridge to Counter, Made Easy',
            2000,
            'Fridge to Counter, For Students',
            2000,
            'Fridge to Counter, For Professionals',
            2000
          ]}
          speed={50}
          style={{ 
            fontSize: '4.5rem', // equivalent to text-7xl
            fontWeight: 'bold', // equivalent to font-bold
            marginBottom: '1rem', // equivalent to mb-4
            color: 'black', // equivalent to text-gray-800
          }}
          repeat={Infinity}
        />
        
        <p className="text-lg text-gray-600 max-w-lg mx-auto m-2">
          Build, personalize, and optimize your itineraries with our free AI trip
          planner. Designed for vacations, workations, and everyday adventures.
        </p>
      </header>
       
      <SearchBar />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <ReadMoreButton />
      </div>
    </div>

      
    {/* ========== Section 1: "How it Works" ========== */}  
    <section className="py-8 lg:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-black">
          Your <span className="text-purple-500">AI-Powered</span> Trip
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          {/* Left Text Block */}
          <div className="flex-1">
            {/* "The most optimal" */}
            <div className="mb-8">
              <span className="inline-block bg-lime-100 text-gray-900 font-bold px-2 py-1 mb-2">
                The most optimal
              </span>
              <p className="text-gray-700">
                Craft your perfect itinerary with Trip Planner AI. Our advanced
                algorithms take into account your selected explore-sights, dining,
                and lodging preferences to create the optimal travel plan tailored
                just for you.
              </p>
            </div>

            {/* "Get Inspired" */}
            <div>
              <span className="inline-block bg-lime-100 text-gray-900 font-bold px-2 py-1 mb-2">
                Get Inspired
              </span>
              <p className="text-gray-700">
                Extract valuable travel insights from Instagram reels and TikToks,
                explore the mentioned explore-sights, and effortlessly include
                them in your own adventure with Trip Planner AI.
              </p>
            </div>
          </div>

          {/* Right Images */}
          <div className="flex-1 flex justify-center items-center">
            {/* Example placeholder images or Next.js <Image> components */}
            <div className="grid grid-cols-2 gap-4">
              <div className="w-40 h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                Turtle / Beach
              </div>
              <div className="w-40 h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                Drink / Torch
              </div>
              <div className="col-span-2 w-40 h-40 bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
                Map / Adventure
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ========== Section 2: "The only tool you'll ever need!" ========== */}
      <section className="py-4 lg:py-12 bg-gray-50 border border-red-500">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="uppercase text-sm text-purple-400 font-semibold tracking-widest">
            Trip Planner AI
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            The only tool you&apos;ll ever need!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Say goodbye to the stress of planning and hello to personalized
            recommendations, efficient itineraries, and seamless dining experiences.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <HomePageCard title="Pantry" message="The only tool you'll ever need!"/>
            <HomePageCard title="Pantry" message="The only tool you'll ever need!"/>
            <HomePageCard title="Pantry" message="The only tool you'll ever need!"/>
          </div>

        </div>
      </section>
    
    </>
  );
}
