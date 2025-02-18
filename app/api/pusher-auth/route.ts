import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Your authentication logic here
  return NextResponse.json({ message: 'Pusher auth success' });
}

