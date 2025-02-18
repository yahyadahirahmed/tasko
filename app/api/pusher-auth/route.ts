import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // filler to free up for deployment
  const filler = await request.json();
    console.log(filler);
  return NextResponse.json({ message: 'Pusher auth success' });
}

