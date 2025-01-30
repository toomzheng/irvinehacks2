import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add CSP headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unity-nonprofits-production.up.railway.app https://newsapi.org;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: data:;
    font-src 'self';
    connect-src 'self' https://newsapi.org;
    frame-src 'self';
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}
