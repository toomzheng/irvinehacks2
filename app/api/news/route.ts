import { NextResponse } from 'next/server'

const API_KEY = process.env.NEWS_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint') // 'headlines' or 'everything'
  
  let url: string
  if (endpoint === 'headlines') {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=50&apiKey=${API_KEY}`
  } else {
    url = `https://newsapi.org/v2/everything?q=nonprofit OR charity OR community&language=en&pageSize=50&sortBy=publishedAt&apiKey=${API_KEY}`
  }

  try {
    const response = await fetch(url)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('News API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
