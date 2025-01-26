"use client";

import './globals.css';
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [postalCode, setPostalCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false);

  useEffect(() => {
    setShowSearchButton(postalCode.trim() !== "" && searchQuery.trim() !== "");
  }, [postalCode, searchQuery]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex items-center gap-2 mb-8"
      >
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600"></div>
          <div className="w-6 h-6 rounded-full bg-blue-800"></div>
          <div className="w-6 h-6 rounded-full bg-red-500"></div>
          <div className="w-6 h-6 rounded-full bg-red-300"></div>
        </div>
        <span className="text-gray-600 text-lg font-normal font-trends">OVER 1K HELPED!</span>
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
        className="text-center"
      >
        <div className="text-6xl font-bold mb-4 font-impact">WE ARE</div>
        <div className="text-8xl font-bold extra-bold">
          <span 
            className="text-[#FF6B6B]"
            style={{ 
              textShadow: '3px 3px 6px rgba(255, 107, 107, 0.7)'
            }}
          >
            UNITY
          </span>{" "}
          <span 
            className="text-[#0066FF]"
            style={{ 
              textShadow: '3px 3px 6px rgba(0, 102, 255, 0.7)'
            }}
          >
            NONPROFITS.
          </span>
        </div>
      </motion.h1>


      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="text-4xl font-semibold text-center mt-8 mb-8 font-arial"
      >
        FIND NONPROFITS NEAR YOU!
      </motion.h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.45 }}
        className="w-full max-w-md space-y-4"
      >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg hover:bg-blue-600">
              Search
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
