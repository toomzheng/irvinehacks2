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
          <div className="text-7xl sm:text-8xl font-bold mb-6 font-impact">WE ARE</div>
          <div className="text-8xl sm:text-9xl font-bold font-helvetica whitespace-nowrap">
            <span className="text-[#FF6B6B]">UNITY</span>{" "}
            <span className="text-[#0066FF]">NONPROFITS.</span>
          </div>
        </motion.h1>

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="text-5xl sm:text-6xl font-semibold text-center font-arial"
        >
          FIND NONPROFITS NEAR YOU!
        </motion.h2>
=======
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
