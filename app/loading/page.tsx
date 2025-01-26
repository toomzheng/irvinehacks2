"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const totalVideos = 48; // Total number of videos available
  const [videoSrc, setVideoSrc] = useState("");
  const [playedVideos, setPlayedVideos] = useState<number[]>([]); // Track played videos

  useEffect(() => {
    // Generate the initial random video when the component mounts
    generateRandomVideo();
  }, []);

  const generateRandomVideo = () => {
    if (playedVideos.length === totalVideos) {
      // Reset played videos if all videos have been played
      setPlayedVideos([]);
    }

    // Get a list of unplayed videos
    const unplayedVideos = Array.from({ length: totalVideos }, (_, i) => i + 1).filter(
      (video) => !playedVideos.includes(video)
    );

    // Randomly select a video from the unplayed videos
    const randomIndex = Math.floor(Math.random() * unplayedVideos.length);
    const randomVideoNumber = unplayedVideos[randomIndex];

    // Update state with the new video and track it as played
    setPlayedVideos((prev) => [...prev, randomVideoNumber]);
    setVideoSrc(`/Lebron_vids/vid${randomVideoNumber}.mp4`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 animate-gradient-flow"></div>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-3xl">
        {/* Loading Message */}
        <p className="mt-8 mb-8 text-xl text-white">Loading Nonprofits...</p>

        {/* Video Container */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          {videoSrc ? (
            <video
              key={videoSrc} // Force re-render when the videoSrc changes
              className="w-full h-full object-cover"
              autoPlay
              controls // Add controls for user interaction
              onEnded={generateRandomVideo} // Trigger new video generation when the current one ends
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-white">Loading video...</p>
          )}
        </div>

        <p className="mt-8 text-xl text-white">
          Here's some LeBron highlights you can watch in the meantime.
        </p>
      </main>

      {/* Footer */}
      <footer className="mt-auto flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://github.com/toomzheng/irvinehacks2"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2025 Melissa's Nonprofits.
        </a>
      </footer>
    </div>
  );
}
