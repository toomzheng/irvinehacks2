import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Get zipCode and type from query parameters
  const { searchParams } = new URL(request.url)
  const zipCode = searchParams.get('zipCode')
  const type = searchParams.get('type')

  // Validate required parameters
  if (!zipCode || !type) {
    return NextResponse.json(
      { error: 'Missing required parameters: zipCode and type' },
      { status: 400 }
    )
  }

  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
    const response = await fetch(
      `${backendUrl}/nonprofits/${zipCode}?interest=${encodeURIComponent(type)}`
    )

    if (!response.ok) {
      throw new Error(`Search failed with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error during search:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
