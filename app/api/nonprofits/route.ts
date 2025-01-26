import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url)

  // Handle zipCode from both URL patterns
  let zipCode = searchParams.get('zipCode')
  if (!zipCode) {
    const matches = pathname.match(/\/nonprofits\/(\d+)/)
    if (matches) {
      zipCode = matches[1]
    }
  }

  const type = searchParams.get('type')

  if (!zipCode || !type) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    const backendUrl = 'https://cf26-128-195-97-44.ngrok-free.app' // Replace with your ngrok URL
    const response = await fetch(
      `${backendUrl}/nonprofits/${zipCode}?interest=${encodeURIComponent(type)}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch nonprofits: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch nonprofits' },
      { status: 500 }
    )
  }
}
