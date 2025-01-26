"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const totalVideos = 48;
  const [videoSrc, setVideoSrc] = useState("");
  const [playedVideos, setPlayedVideos] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    generateRandomVideo();
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const zipCode = sessionStorage.getItem('lastZipCode');
      const type = sessionStorage.getItem('lastType');

      const response = await fetch(`/api/nonprofits?zipCode=${zipCode}&type=${type}`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const newData = await response.json();

      // Get existing results and append new ones
      let existingResults = [];
      try {
        const storedResults = sessionStorage.getItem('nonprofitResults');
        if (storedResults) {
          existingResults = JSON.parse(storedResults);
          if (!Array.isArray(existingResults)) {
            existingResults = [];
          }
        }
      } catch (error) {
        console.error('Error parsing stored results:', error);
        existingResults = [];
      }

      const combinedResults = [...existingResults, ...newData];

      // Store combined results
      sessionStorage.setItem('nonprofitResults', JSON.stringify(combinedResults));
      sessionStorage.removeItem('isGenerating');
      router.push('/info');
    } catch (error) {
      console.error('Error during search:', error);
      router.push('/');
    }
  };

  const generateRandomVideo = () => {
    if (playedVideos.length === totalVideos) {
      setPlayedVideos([]);
    }

    const unplayedVideos = Array.from({ length: totalVideos }, (_, i) => i + 1).filter(
      (video) => !playedVideos.includes(video)
    );

    const randomIndex = Math.floor(Math.random() * unplayedVideos.length);
    const randomVideoNumber = unplayedVideos[randomIndex];

    setPlayedVideos((prev) => [...prev, randomVideoNumber]);
    setVideoSrc(`/Lebron_vids/vid${randomVideoNumber}.mp4`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col items-center w-full max-w-5xl mx-auto">
        <motion.div
          className="relative z-10 w-full max-w-[90vw] mx-auto px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold mb-12 animate-pulse bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent text-center"
          >
            Discovering Amazing Nonprofits Near You...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_150px_30px_rgb(0,89,255)] max-w-[1400px] mx-auto"
          >
            {videoSrc ? (
              <video
                key={videoSrc}
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={generateRandomVideo}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white text-2xl">Loading video...</p>
              </div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="mt-12 text-3xl sm:text-4xl font-semibold text-center leading-relaxed"
          >
            🏀 Enjoy these <span className="text-[rgb(0,89,255)] font-bold">LeBron highlights</span> while we prepare your matches!
          </motion.p>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        className="mt-auto flex gap-6 flex-wrap items-center justify-center text-xl"
      >
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/toomzheng/irvinehacks2"
          target="_blank"
          rel="noopener noreferrer"
        >
          2025 Unity Nonprofits.
        </a>
      </motion.footer>
    </div>
  );
}
