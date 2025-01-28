  "use client";

import './globals.css';
import { useState, useEffect, KeyboardEvent, useCallback } from "react";
import { Pencil, Search, Star, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [postalCode, setPostalCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [savedNonprofits, setSavedNonprofits] = useState<any[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const nicheInterests = [
    "Urban Farming",
    "Digital Literacy",
    "Marine Conservation",
    "Youth Mentorship",
    "Arts Education",
    "Senior Tech Support",
    "Food Waste Reduction",
    "Refugee Support",
    "Music Therapy",
    "Wildlife Rehabilitation",
    "Adaptive Sports",
    "Community Gardens",
    "Literacy Programs",
    "Pet Therapy",
    "STEM Education",
    "Mental Health Support",
    "Sustainable Fashion",
    "Veteran Services",
    "Special Needs Support",
    "Environmental Justice"
  ];

  const isValidPostalCode = useCallback((code: string) => {
    return /^\d{5}$/.test(code);
  }, []);

  useEffect(() => {
    setShowSearchButton(isValidPostalCode(postalCode) && searchQuery.trim() !== "");
  }, [postalCode, searchQuery, isValidPostalCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => 
        prevIndex === searchSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load saved nonprofits from local storage
    const storedNonprofits = localStorage.getItem('savedNonprofits');
    if (storedNonprofits) {
      setSavedNonprofits(JSON.parse(storedNonprofits));
    }
  }, []);

  const handleSaveNonprofit = (nonprofit: any) => {
    const updatedSavedNonprofits = [...savedNonprofits];
    const index = updatedSavedNonprofits.findIndex(n => n.name === nonprofit.name);
    
    if (index === -1) {
      // Add to saved nonprofits
      updatedSavedNonprofits.push(nonprofit);
    } else {
      // Remove from saved nonprofits
      updatedSavedNonprofits.splice(index, 1);
    }
    
    setSavedNonprofits(updatedSavedNonprofits);
    localStorage.setItem('savedNonprofits', JSON.stringify(updatedSavedNonprofits));
  };

  const isNonprofitSaved = (nonprofit: any) => {
    return savedNonprofits.some(n => n.name === nonprofit.name);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPostalCode(value);
  };

  const handleSurpriseMe = () => {
    if (!isValidPostalCode(postalCode)) return;
    
    // Pick a random niche interest
    const randomInterest = nicheInterests[Math.floor(Math.random() * nicheInterests.length)];
    setSearchQuery(randomInterest);
    
    // Auto-submit the search
    handleSearch(randomInterest);
  };

  const handleSearch = async (overrideQuery?: string) => {
    const queryToUse = overrideQuery || searchQuery;
    
    if (!postalCode) {
      setError('Please enter a postal code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Store the search parameters for loading page
    sessionStorage.setItem('lastZipCode', postalCode);
    sessionStorage.setItem('lastType', queryToUse);
    
    // Navigate to loading page - let it handle the API call
    router.push('/loading');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isValidPostalCode(postalCode) && searchQuery.trim()) {
        handleSearch();
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white relative overflow-hidden">
      {/* Spacer */}
      <div className="flex-grow-0 h-24" />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600"></div>
              <div className="w-8 h-8 rounded-full bg-blue-800"></div>
              <div className="w-8 h-8 rounded-full bg-red-500"></div>
              <div className="w-8 h-8 rounded-full bg-red-300"></div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
            className="absolute top-8 right-8"
          >
            <button
              onClick={() => router.push('/saved')}
              className="bg-[#FF7B7B] hover:bg-[#FF5260] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Star className="h-5 w-5" />
              Saved Nonprofits
            </button>
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
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-xl">
                  <div className="relative flex items-center mb-4">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Search className="h-7 w-7 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={handlePostalCodeChange}
                      onKeyPress={handleKeyPress}
                      maxLength={5}
                      placeholder="Enter your postal code"
                      className="w-full px-8 py-6 pl-16 rounded-full bg-gray-200 text-gray-600 text-2xl focus:outline-none font-georgia"
                    />
                    {isValidPostalCode(postalCode) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder=""
                      className="w-full px-8 py-6 rounded-full bg-gray-200 text-gray-600 text-2xl focus:outline-none font-georgia"
                    />
                    {!searchQuery && (
                      <>
                        <div className="absolute left-8 top-6 pointer-events-none overflow-hidden h-8">
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
                        {isValidPostalCode(postalCode) && !searchQuery && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          >
                            <button
                              onClick={handleSurpriseMe}
                              className="text-[#FF7B7B] hover:text-[#FF5260] hover:bg-transparent font-semibold px-4 py-2 text-lg"
                            >
                              Surprise Me!
                            </button>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                </div>
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

      {/* Lebron Mode Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4 mb-8"
      >
        <button
          onClick={() => router.push('/lebron')}
          className="w-full bg-[#552583] hover:bg-[#FDB927] text-white hover:text-[#552583] px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Lebron Mode</span>
          <span className="text-2xl">👑</span>
        </button>
      </motion.div>
    </div>
  );
}
