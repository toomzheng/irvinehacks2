"use client";

import './globals.css';
import { useState, useEffect, KeyboardEvent } from "react";
import { Pencil, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [postalCode, setPostalCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const router = useRouter();

  const searchSuggestions = [
    "Food banks and meal services",
    "Youth mentoring programs",
    "Environmental conservation",
    "Animal shelters and rescue",
    "Senior care and companionship",
    "Homeless shelter support",
    "Educational tutoring",
    "Community gardens",
    "Mental health support",
    "Disaster relief",
  ];

  useEffect(() => {
    setShowSearchButton(postalCode.trim() !== "" && searchQuery.trim() !== "");
  }, [postalCode, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => 
        prevIndex === searchSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!showSearchButton) return;
    
    router.push('/loading');
    
    try {
      const response = await fetch(`/api/nonprofits?zipCode=${encodeURIComponent(postalCode)}&type=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch nonprofits');
      }
      const data = await response.json();
      sessionStorage.setItem('nonprofitResults', JSON.stringify(data));
      router.push('/info');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred while searching');
      router.push('/');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center"
        >
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600"></div>
            <div className="w-8 h-8 rounded-full bg-blue-800"></div>
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
            <div className="w-8 h-8 rounded-full bg-red-300"></div>
          </div>
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
          className="w-full max-w-2xl space-y-6"
        >
          <div className="relative flex items-center">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="h-7 w-7 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Enter Your Postal Code"
              className="w-full px-8 py-6 pl-16 rounded-full bg-gray-200 text-gray-600 text-2xl focus:outline-none font-georgia"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="relative">
            <Pencil className="absolute left-6 top-7 text-muted-foreground h-7 w-7" />
            <div className="relative">
              <textarea
                placeholder=""
                className="w-full px-8 py-6 pl-16 rounded-2xl bg-gray-200 text-gray-600 text-2xl focus:outline-none font-georgia min-h-[8rem] resize-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {!searchQuery && (
                <div className="absolute left-16 top-6 pointer-events-none overflow-hidden h-8">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={placeholderIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.5, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-2xl text-gray-400"
                    >
                      {searchSuggestions[placeholderIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="h-24 relative"> 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showSearchButton ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-full flex justify-center"
            >
              <button 
                className="px-12 py-6 bg-blue-500 text-white rounded-full text-2xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                onClick={handleSearch}
              >
                Search
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
