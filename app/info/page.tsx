'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, Globe, Phone } from 'lucide-react';

export default function InfoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [savedNonprofits, setSavedNonprofits] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchParams, setSearchParams] = useState({ zipCode: '', interest: '' });
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('nonprofitResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    setIsLoading(false);

    // Load saved nonprofits
    const storedNonprofits = localStorage.getItem('savedNonprofits');
    if (storedNonprofits) {
      setSavedNonprofits(JSON.parse(storedNonprofits));
    }

    // Get search parameters
    const zipCode = sessionStorage.getItem('lastZipCode') || '';
    const interest = sessionStorage.getItem('lastType') || '';
    setSearchParams({ zipCode, interest });
  }, []);

  const handleGenerateMore = async () => {
    setIsGenerating(true);
    sessionStorage.setItem('isGenerating', 'true');
    sessionStorage.setItem('lastZipCode', searchParams.zipCode);
    sessionStorage.setItem('lastType', searchParams.interest);
    router.push('/loading');
  };

  const handleSaveNonprofit = (nonprofit: any) => {
    const updatedSavedNonprofits = isNonprofitSaved(nonprofit)
      ? savedNonprofits.filter(saved => saved.name !== nonprofit.name)
      : [...savedNonprofits, nonprofit];
    
    setSavedNonprofits(updatedSavedNonprofits);
    localStorage.setItem('savedNonprofits', JSON.stringify(updatedSavedNonprofits));
  };

  const isNonprofitSaved = (nonprofit: any) => {
    return savedNonprofits.some(saved => saved.name === nonprofit.name);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Animated Wave Background */}
      <motion.div 
        className="absolute inset-0 z-0"
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
      <div className="relative z-10 w-full">
        <div className="w-full pt-12">
          {/* Header */}
          <div className="flex justify-center w-full mb-0">
            <div className="px-6 py-3 rounded-2xl inline-block bg-white shadow-xl">
              <div className="flex flex-col items-center">
                <h1 className="font-bold inline-flex items-baseline justify-center gap-3 flex-wrap whitespace-nowrap">
                  <span style={{ color: '#FF5260' }} className="text-5xl sm:text-6xl">NONPROFITS</span>
                  <span style={{ color: '#2404AA' }} className="text-3xl sm:text-4xl">FOR YOU.</span>
                </h1>
                <motion.h2 
                  className="text-2xl text-white text-center mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Showing nonprofits for{" "}
                </motion.h2>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => router.push('/')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Search Again
              </Button>
              <Button
                onClick={handleGenerateMore}
                disabled={isGenerating}
                className="bg-[#FF7B7B] hover:bg-[#FF5260] text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate More'}
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 py-8">
            {results.map((nonprofit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col bg-white shadow-xl hover:shadow-2xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-2xl font-bold text-[#FF5260] line-clamp-2">
                        {nonprofit.name}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSaveNonprofit(nonprofit)}
                        className={`ml-2 ${isNonprofitSaved(nonprofit) ? 'text-yellow-500' : 'text-gray-400'}`}
                      >
                        <Star className={`h-6 w-6 ${isNonprofitSaved(nonprofit) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    {nonprofit.category && (
                      <CardDescription className="text-lg text-gray-600 line-clamp-1">
                        {nonprofit.category}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-lg text-gray-700 line-clamp-4 mb-1">
                      {nonprofit.description}
                    </p>
                    <div className="space-y-3">
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
                  </CardContent>
                  {nonprofit.website && (
                    <CardFooter className="pt-4">
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

          {/* No Results Message */}
          {!isLoading && results.length === 0 && (
            <div className="text-center text-white text-3xl mt-12">
              No nonprofits found. Please try a different search.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
