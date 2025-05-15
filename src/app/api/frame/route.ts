import { NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage } from '@farcaster/frame-js';

export async function POST(req: Request) {
  try {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body);

    if (!isValid) {
      return new NextResponse('Invalid frame request', { status: 400 });
    }

    // Handle the frame interaction
    const buttonIndex = message?.buttonIndex;
    const inputText = message?.inputText;

    // For now, just redirect to the main app
    return NextResponse.json({
      frame: {
        version: 'vNext',
        image: 'https://farcastipmini.vercel.app/og-image.png',
        buttons: [
          {
            label: 'Send MON Tip',
            action: 'post_redirect'
          }
        ],
        postUrl: 'https://farcastipmini.vercel.app/api/frame',
        input: {
          text: 'Enter Farcaster username or address'
        }
      }
    });
  } catch (error) {
    console.error('Frame API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 