import React, { useState } from "react";
import Image from "next/image";

import image1 from "@/public/image.png";
import image2 from "@/public/globe.svg";
import image3 from "@/public/logo.svg";


const photos = [
    image1,
    image2,
    image3
];

const InspireCard = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col max-w-64 min-w-64 overflow-hidden">
      {/* Image Section */}
      <div className="rounded-2xl group relative aspect-portrait overflow-hidden max-h-80 h-80 min-h-80">
        {/* Image */}
        <Image
            src={photos[currentPhoto]}
            alt={`Photo ${currentPhoto + 1}`}
            className="object-contain max-w-full"
        />

        {/* Pagination Arrows */}
        {currentPhoto != 0 && (
            <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-md p-2 rounded-full shadow hover:bg-white opacity-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {currentPhoto != photos.length - 1 && (
        <button
          onClick={nextPhoto}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-md p-2 rounded-full shadow hover:bg-white opacity-0 group-hover:opacity-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
    )}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentPhoto === index ? "bg-white" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1.5 pt-4 pl-1 text-sm leading-tight max-h-32 text-left">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-md">
          A Bucketlist Weekend in Istanbul
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600">
            <h5 className="font-semibold text-gray-800">
            Istanbul, Türkiye
            </h5>
        </div>

        {/* Author */}
        <div className="flex items-center text-gray-600 text-sm">
          <img
            src="https://via.placeholder.com/40"
            alt="Author"
            className="w-5 h-5 rounded-full mr-2 mt-0.5"
          />
          <span>@theguidedtravels</span>
        </div>
      </div>
    </div>
  );
};

export default InspireCard;
