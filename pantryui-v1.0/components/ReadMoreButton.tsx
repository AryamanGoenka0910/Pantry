import React from "react";




export default function ReadMoreButton() {

    const handleScroll = () => {
        window.scrollTo({
          top: window.innerHeight * 0.9, // Scrolls to the next section (1 viewport height down)
          behavior: "smooth", // Smooth scrolling effect
        });
    };

    return (
        <button 
            onClick={handleScroll}
            className="flex items-center space-x-2 text-lg font-medium text-gray-700 hover:text-gray-900 group"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform group-hover:translate-y-1 transition-transform duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
            />
            </svg>

            <span>Read More</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform group-hover:translate-y-1 transition-transform duration-300 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    );
};
