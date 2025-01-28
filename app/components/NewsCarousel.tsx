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
          'nonprofit+organization+news',
          'nonprofit+charity+foundation+current',
          'NGO+nonprofit+initiative+latest',
          'nonprofit+organization+impact+today',
          'charitable+foundation+nonprofit+news'
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
              `https://newsapi.org/v2/everything?q=${query}${locationQuery}&language=en&sortBy=publishedAt&pageSize=25&from=${fromDate}`,
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
        
        // Filter articles to ensure they are nonprofit-focused
        const nonprofitKeywords = [
          'nonprofit', 'non-profit', 'charity', 'foundation', 'NGO',
          'charitable', 'philanthropy', 'donation', 'fundraising'
        ];
        
        const filteredArticles = combinedArticles.filter(article => {
          const text = `${article.title} ${article.description}`.toLowerCase();
          return nonprofitKeywords.some(keyword => text.includes(keyword.toLowerCase()));
        });

        // Remove duplicates
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
        // Fallback to dummy data in case of error
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
    // Fetch news every 30 minutes
    const intervalId = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Duplicate the news items to create seamless scrolling
  const allNews = [...news, ...news];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || news.length === 0) return;

    const scrollHeight = container.scrollHeight / 2;
    let scrollPos = 0;
    
    const scroll = () => {
      scrollPos += 0.5;
      if (scrollPos >= scrollHeight) {
        scrollPos = 0;
        container.scrollTop = 0;
      }
      container.scrollTop = scrollPos;
    };

    const intervalId = setInterval(scroll, 30);
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
            {allNews.map((item, index) => (
              <Link 
                key={`${index}-${item.title}`}
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
