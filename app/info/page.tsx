"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('nonprofitResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-white">
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
        className="relative z-10 w-full max-w-8xl mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-center w-full mb-8">
          <div className="px-8 py-4 rounded-3xl inline-block bg-white shadow-2xl">
            <h1 className="font-bold inline-flex items-baseline justify-center gap-4 flex-wrap whitespace-nowrap">
              <span style={{ color: '#FF5260' }} className="text-6xl sm:text-7xl">NONPROFITS</span>
              <span style={{ color: '#2404AA' }} className="text-4xl sm:text-5xl">FOR YOU.</span>
            </h1>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center mb-10">
          <Button
            onClick={() => router.push('/')}
            className="px-6 py-4 text-xl rounded-full hover:scale-105 transition-transform"
            variant="outline"
          >
            ← Back to Search
          </Button>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
          {results.map((nonprofit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow h-full flex flex-col">
                <CardHeader className="flex-none">
                  <CardTitle className="text-2xl font-bold text-[#FF5260] line-clamp-2">
                    {nonprofit.name}
                  </CardTitle>
                  {nonprofit.category && (
                    <CardDescription className="text-lg text-gray-600 line-clamp-1">
                      {nonprofit.category}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="space-y-4 flex-grow">
                    <p className="text-lg text-gray-700 line-clamp-4">
                      {nonprofit.description}
                    </p>
                    <div className="space-y-3 pt-4">
                      {nonprofit.address && (
                        <div className="flex items-start space-x-3 text-gray-600">
                          <MapPin className="h-5 w-5 text-[#FF5260] flex-shrink-0 mt-1" />
                          <span className="text-lg line-clamp-2">{nonprofit.address}</span>
                        </div>
                      )}
                      {nonprofit.website && (
                        <div className="flex items-start space-x-3 text-gray-600">
                          <Globe className="h-5 w-5 text-[#FF5260] flex-shrink-0 mt-1" />
                          <a
                            href={nonprofit.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg hover:text-[#FF5260] transition-colors line-clamp-1"
                          >
                            {nonprofit.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      {nonprofit.phone && (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Phone className="h-5 w-5 text-[#FF5260] flex-shrink-0" />
                          <span className="text-lg">{nonprofit.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                {nonprofit.website && (
                  <CardFooter className="flex-none pt-4">
                    <Button 
                      className="w-full bg-[#FF5260] hover:bg-[#FF6B6B] text-white"
                      onClick={() => window.open(nonprofit.website, '_blank')}
                    >
                      Visit Website
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {!isLoading && results.length === 0 && (
          <div className="text-center text-white text-3xl mt-12">
            No nonprofits found. Please try a different search.
          </div>
        )}
      </motion.div>
    </div>
  );
}
