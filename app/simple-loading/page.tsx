'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SimpleLoading() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zipCode = sessionStorage.getItem('lastZipCode');
        const type = sessionStorage.getItem('lastType');

        if (!zipCode || !type) {
          router.push('/');
          return;
        }

        const response = await fetch(`/api/nonprofits?zipCode=${zipCode}&type=${encodeURIComponent(type)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch nonprofits');
        }

        const data = await response.json();
        
        // Store the results in sessionStorage
        sessionStorage.setItem('searchResults', JSON.stringify(data));
        
        // Navigate to results page
        router.push('/info');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setTimeout(() => router.push('/'), 3000);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {error ? (
        <div className="text-red-500 text-xl">{error}</div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          />
          <p className="text-xl text-gray-600">Searching for nonprofits...</p>
        </div>
      )}
    </div>
  );
}
