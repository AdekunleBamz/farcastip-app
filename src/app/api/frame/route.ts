import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Return a simple frame response
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>FarcasTip Frame</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/og-image.png" />
          <meta property="fc:frame:button:1" content="Send MON Tip" />
          <meta property="fc:frame:button:1:action" content="post_redirect" />
          <meta property="fc:frame:post_url" content="https://farcastipmini.vercel.app/api/frame" />
          <meta property="fc:frame:input:text" content="Enter Farcaster username or address" />
        </head>
        <body>
          <h1>FarcasTip Frame</h1>
          <p>Redirecting to FarcasTip app...</p>
          <script>
            window.location.href = 'https://farcastipmini.vercel.app';
          </script>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Frame API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 