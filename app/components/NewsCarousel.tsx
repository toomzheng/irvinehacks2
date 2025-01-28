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

        // Try top headlines first, then fall back to everything endpoint
        const fetchAttempts = [
          // First attempt: US top headlines with category
          async () => {
            console.log('Attempting to fetch top headlines...');
            const response = await fetch(
              `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=50`,
              {
                headers: {
                  'X-Api-Key': apiKey
                }
              }
            );
            
            if (!response.ok) {
              throw new Error(`Top headlines failed: ${response.status}`);
            }
            
            return response.json();
          },
          // Second attempt: Simple everything query
          async () => {
            console.log('Attempting to fetch everything endpoint...');
            const response = await fetch(
              `https://newsapi.org/v2/everything?q=nonprofit OR charity OR community&language=en&pageSize=50&sortBy=publishedAt`,
              {
                headers: {
                  'X-Api-Key': apiKey
                }
              }
            );
            
            if (!response.ok) {
              throw new Error(`Everything endpoint failed: ${response.status}`);
            }
            
            return response.json();
          }
        ];

        // Try each fetch attempt until one succeeds
        let articles = [];
        let lastError = null;

        for (const attempt of fetchAttempts) {
          try {
            const data = await attempt();
            if (data.articles && data.articles.length > 0) {
              articles = data.articles;
              console.log(`Successfully fetched ${articles.length} articles`);
              break;
            }
          } catch (error) {
            console.error('Fetch attempt failed:', error);
            lastError = error;
          }
        }

        if (articles.length === 0) {
          console.error('All fetch attempts failed:', lastError);
          // Use fallback data
          setNews([
            {
              title: "Community Volunteers Make a Difference in Local Food Banks",
              url: "https://example.com/news1",
              publisher: "Community News"
            },
            {
              title: "New Environmental Conservation Initiative Launches",
              url: "https://example.com/news2",
              publisher: "Environmental Times"
            },
            {
              title: "Youth Mentorship Program Shows Promising Results",
              url: "https://example.com/news3",
              publisher: "Education Weekly"
            },
            {
              title: "Local Charity Expands Support Services",
              url: "https://example.com/news4",
              publisher: "City News"
            },
            {
              title: "Innovative Social Program Helps Homeless Find Housing",
              url: "https://example.com/news5",
              publisher: "Social Impact News"
            }
          ]);
          setError('Using fallback news data while we fix the connection...');
          return;
        }

        // Filter and process the articles
        const filteredArticles = articles.filter(article => {
          if (!article?.title) return false;
          const text = article.title.toLowerCase();
          // Less strict filtering to ensure we get some results
          return !text.includes('bitcoin') && 
                 !text.includes('crypto') && 
                 !text.includes('stock market');
        });

        // Remove duplicates
        const uniqueArticles = Array.from(
          new Map(filteredArticles.map(article => [article.url, article])).values()
        );

        if (uniqueArticles.length > 0) {
          const newsItems = uniqueArticles.map((article: any) => ({
            title: article.title,
            url: article.url,
            publisher: article.source?.name || 'News Source'
          }));
          setNews(newsItems);
          setError(null);
          console.log(`Successfully processed ${newsItems.length} news items`);
        } else {
          throw new Error('No articles found after filtering');
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
