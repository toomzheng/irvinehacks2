"use client";

import { useState, useEffect } from "react";

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
      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-3xl">
        {/* Loading Message */}
        <p className="mt-8 mb-8 text-3xl font-bold animate-pulse bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Discovering Amazing Nonprofits Near You...
        </p>

        {/* Video Container */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_100px_20px_rgb(0,89,255)]">          {videoSrc ? (
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
            <p className="text-white">Loading video...</p>
          )}
        </div>


        <p className="mt-8 text-2xl font-semibold text-center leading-relaxed">
          🏀 Enjoy these <span className="text-[rgb(0,89,255)] font-bold">LeBron highlights</span> while we prepare your matches!
        </p>
      </main>

      {/* Footer */}
      <footer className="mt-auto flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/toomzheng/irvinehacks2"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2025 Unity Nonprofits.
        </a>
      </footer>
    </div>
  );
}
