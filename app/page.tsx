"use client";

import './globals.css';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600"></div>
          <div className="w-6 h-6 rounded-full bg-blue-800"></div>
          <div className="w-6 h-6 rounded-full bg-red-500"></div>
          <div className="w-6 h-6 rounded-full bg-red-300"></div>
        </div>
        <span className="text-gray-600 text-lg font-normal font-trends">OVER 1K HELPED!</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-center">
        <div className="text-6xl font-bold mb-4 font-impact">WE ARE</div>
        <div className="text-8xl font-bold font-helvetica">
          <span className="text-[#FF6B6B]">UNITY</span>{" "}
          <span className="text-[#0066FF]">NONPROFITS.</span>
        </div>
      </h1>

      {/* Subheadline */}
      <h2 className="text-4xl font-semibold text-center mt-8 mb-8 font-arial">
        FIND NONPROFITS NEAR YOU!
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Your Postal Code"
            className="w-full px-6 py-4 rounded-full bg-gray-200 text-gray-400 text-lg focus:outline-none font-georgia"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
