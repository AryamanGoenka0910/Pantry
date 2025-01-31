"use client";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#2A2236] flex items-center justify-center p-4">
      {/* Outer Card */}
      <div className="max-w-5xl w-full bg-[#3B2B51] rounded-lg overflow-hidden shadow-lg flex">

        {/* Left Side (Image / Info) */}
        <div className="hidden md:flex md:flex-col md:w-1/2 bg-[#3B2B51] relative">
          {/* Background image */}
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/sand-dunes.jpg')" }}
          >
            {/* Dark overlay for readability */}
            <div className="h-full w-full bg-black/30 p-6 flex flex-col justify-between">
              {/* "Back to website" button at top */}
              <div className="text-right">
                <Link href="/">
                  {/* <a className="inline-block bg-white/80 text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-white">
                    Back to website →
                  </a> */}
                </Link>
              </div>

              {/* Footer text or “carousel dots” at bottom */}
              <div className="text-white mb-4">
                <h2 className="text-2xl font-bold mb-2">
                  Capturing Moments, Creating Memories
                </h2>
                {/* Example “dots” for a pseudo carousel */}
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 bg-[#44365B] p-8 sm:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create an account
          </h1>
          <p className="text-gray-300 mb-8">
            Already have an account?{" "}
            <Link href="/login">
              {/* <a className="text-purple-300 hover:underline">Log in</a> */}
            </Link>
          </p>

          {/* Form */}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="flex-1 py-2 px-3 rounded bg-[#2E2840] text-white outline-none border border-transparent focus:border-purple-500"
            />
            <input
              type="text"
              placeholder="Last name"
              className="flex-1 py-2 px-3 rounded bg-[#2E2840] text-white outline-none border border-transparent focus:border-purple-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 py-2 px-3 rounded bg-[#2E2840] text-white outline-none border border-transparent focus:border-purple-500"
          />
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full py-2 px-3 rounded bg-[#2E2840] text-white outline-none border border-transparent focus:border-purple-500"
            />
            {/* Eye icon, if you want, absolutely positioned on the right */}
            <div className="absolute right-3 top-2 text-gray-400 cursor-pointer">
              👁
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <input type="checkbox" className="mr-2" />
            <p className="text-gray-300 text-sm">
              I agree to the{" "}
              <a href="#" className="text-purple-300 hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>

          <button className="w-full py-2 bg-purple-500 rounded text-white font-semibold hover:bg-purple-600">
            Create account
          </button>

          {/* Separator */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-500"></div>
            <p className="px-4 text-gray-300 text-sm">Or register with</p>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 py-2 border border-gray-400 rounded text-white hover:bg-white/10">
              <span className="mr-2">G</span> Google
            </button>
            <button className="flex-1 py-2 border border-gray-400 rounded text-white hover:bg-white/10">
              <span className="mr-2"></span> Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
