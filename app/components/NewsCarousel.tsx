'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface NewsItem {
  title: string;
  url: string;
  publisher: string;
}

export default function NewsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        if (!apiKey) {
          throw new Error('News API key is not configured');
        }

        const postalCode = sessionStorage.getItem('lastZipCode') || '';
        const locationQuery = postalCode ? `+location:${postalCode}` : '';

        // Multiple search queries to get more diverse results
        const searchQueries = [
          // Nonprofit and charity focused
          'nonprofit+organization+news',
          'charity+foundation+impact',
          'NGO+humanitarian+aid',
          'philanthropy+donation+initiative',
          
          // Community and social impact
          'community+service+volunteer',
          'social+impact+positive+change',
          'community+development+success',
          'grassroots+movement+change',
          
          // Global improvement initiatives
          'sustainable+development+progress',
          'climate+action+solution',
          'education+initiative+success',
          'poverty+reduction+progress',
          
          // Mental health and wellbeing
          'mental+health+support+community',
          'wellness+program+success',
          'youth+empowerment+program',
          
          // Environmental and conservation
          'environmental+conservation+success',
          'wildlife+protection+initiative',
          'ocean+cleanup+progress',
          
          // Technology for good
          'technology+social+good',
          'innovation+humanitarian+solution'
        ];

        console.log('Fetching news...');
        
        // Get today's date for fresh news
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const fromDate = thirtyDaysAgo.toISOString().split('T')[0];

        // Fetch news for each search query
        const allArticles = await Promise.all(
          searchQueries.map(async (query) => {
            const response = await fetch(
              `https://newsapi.org/v2/everything?q=${query}${locationQuery}&language=en&sortBy=publishedAt&pageSize=50&from=${fromDate}`,
              {
                headers: {
                  'X-Api-Key': apiKey
                }
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.articles || [];
          })
        );

        // Combine and deduplicate articles
        const combinedArticles = allArticles.flat();
        
        // Filter articles to ensure they are relevant
        const relevantKeywords = [
          // Nonprofit keywords
          'nonprofit', 'non-profit', 'charity', 'foundation', 'NGO',
          'charitable', 'philanthropy', 'donation', 'fundraising',
          
          // Community keywords
          'community', 'volunteer', 'service', 'grassroots',
          'social impact', 'humanitarian',
          
          // Progress keywords
          'improvement', 'development', 'initiative', 'success',
          'progress', 'solution', 'innovation',
          
          // Cause keywords
          'education', 'environment', 'climate', 'health',
          'poverty', 'conservation', 'sustainability',
          'empowerment', 'wellbeing', 'protection'
        ];
        
        const filteredArticles = combinedArticles.filter(article => {
          if (!article.title || !article.description) return false;
          const text = `${article.title} ${article.description}`.toLowerCase();
          return (
            relevantKeywords.some(keyword => text.includes(keyword.toLowerCase())) &&
            !text.includes('bitcoin') && // Exclude cryptocurrency news
            !text.includes('crypto') &&
            !text.includes('stock market') // Exclude financial market news
          );
        });

        // Remove duplicates using URL as unique identifier
        const uniqueArticles = Array.from(
          new Map(filteredArticles.map(article => [article.url, article])).values()
        );

        if (uniqueArticles.length > 0) {
          const newsItems = uniqueArticles.map((article: any) => ({
            title: article.title,
            url: article.url,
            publisher: article.source.name
          }));
          setNews(newsItems);
          setError(null);
          console.log(`Fetched ${newsItems.length} unique articles`);
        } else {
          throw new Error('No articles found in the response');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch news');
        setNews([
          {
            title: "New Local Volunteering Initiative Launches",
            url: "https://example.com/news1",
            publisher: "Local News Network"
          },
          {
            title: "Community Service Programs Expand in 2025",
            url: "https://example.com/news2",
            publisher: "Community Daily"
          },
          {
            title: "Youth Volunteers Make a Difference",
            url: "https://example.com/news3",
            publisher: "Youth Today"
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || news.length === 0) return;

    const scrollSpeed = 0.5;
    const scrollInterval = 30;

    const scroll = () => {
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        // If we've scrolled past the height of one set of news items,
        // reset to the top but maintain smooth appearance
        if (newPosition >= maxScroll) {
          container.scrollTop = 0;
          return 0;
        }
        
        container.scrollTop = newPosition;
        return newPosition;
      });
    };

    const intervalId = setInterval(scroll, scrollInterval);
    return () => clearInterval(intervalId);
  }, [loading, news]);

  if (loading) {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="p-4 h-full flex flex-col">
          <h3 className="text-white text-xl mb-4">Latest News</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading news...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="p-4 h-full flex flex-col">
          <h3 className="text-white text-xl mb-4">Latest News</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-sm">
              {error}
              <br />
              Using fallback news data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="p-4 h-full flex flex-col">
        <h3 className="text-white text-xl mb-4">Latest News</h3>
        <div 
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
        >
          <div className="space-y-4">
            {/* Original news items */}
            {news.map((item, index) => (
              <Link 
                key={`${item.url}-${index}`}
                href={item.url}
                target="_blank"
                className="block p-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
              >
                <h4 className="text-white font-medium mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  Published by: {item.publisher}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
