"use client";

import './globals.css';
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

export default function Home() {
  const [postalCode, setPostalCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false);

  useEffect(() => {
    setShowSearchButton(postalCode.trim() !== "" && searchQuery.trim() !== "");
  }, [postalCode, searchQuery]);

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

      {/* Search Bar and Query Inputs */}
      <div className="w-full max-w-md space-y-4">
        <div className="relative">
          <svg className="w-6 h-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Enter Your Postal Code"
            className="w-full px-6 py-4 pl-10 rounded-full bg-gray-200 text-gray-400 text-lg focus:outline-none font-georgia"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="relative">
          
        <Pencil className="absolute left-3 top-5 text-muted-foreground h-5 w-5" />
          <textarea
            placeholder="What are you looking for?"
            className="w-full px-6 py-4 pl-10 rounded-2xl bg-gray-200 text-gray-400 text-lg focus:outline-none font-georgia min-h-[3rem]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {showSearchButton && (
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg hover:bg-blue-600">
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
