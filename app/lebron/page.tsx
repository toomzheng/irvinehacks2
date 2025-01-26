"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const totalVideos = 48;
  const [videoSrc, setVideoSrc] = useState("");
  const [playedVideos, setPlayedVideos] = useState<number[]>([]);

  useEffect(() => {
    generateRandomVideo();
  }, []);

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_150px_30px_rgb(0,89,255)] max-w-[1400px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
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
        </motion.div>
        <Link href="/" passHref>
            <motion.button
                className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-2xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                duration: 1,
                ease: "easeInOut",
                delay: 0.5
                }}
            >
                Return to Main Page
            </motion.button>
            </Link>
      </main>
    </div>
  );
}
