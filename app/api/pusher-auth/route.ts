import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  // Your authentication logic here
  return NextResponse.json({ message: 'Pusher auth success' });
}

