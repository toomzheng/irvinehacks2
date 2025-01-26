"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CardWithForm } from "@/app/components/Card";
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Animated Wave Background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ backgroundColor: '#0933FE' }}
      >
        <div className="absolute top-0 left-0 w-full"
          style={{
            height: '120px',
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1200 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z\' fill=\'%23FFFFFF\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            transform: 'translateY(-99%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-center w-full mb-8 mt-12">
          <div className="px-8 py-4 rounded-2xl inline-block" style={{ backgroundColor: '#FFFFFF' }}>
            <h1 className="font-bold inline-flex items-baseline justify-center gap-4 flex-wrap whitespace-nowrap">
              <span style={{ color: '#FF5260' }} className="text-8xl">NONPROFITS</span>
              <span style={{ color: '#2404AA' }} className="text-5xl">FOR YOU.</span>
            </h1>
          </div>
        </div>

        {/* 2x2 grid of cards */}
        <div className="grid grid-cols-2 gap-6 max-w-6xl w-full p-8 mx-auto">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index}
              className="rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: '#FF999A' }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                LOREM IPSUM DOLOR SIT AMET
              </h2>
              <p className="mb-6" style={{ color: '#FFFFFF' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2" style={{ color: '#FFFFFF' }}>
                  <span>✉</span>
                  <span>www.loremipsumsiteblah blah</span>
                </div>
                <div className="flex items-center space-x-2" style={{ color: '#FFFFFF' }}>
                  <span>📍</span>
                  <span>Irvine, CA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
