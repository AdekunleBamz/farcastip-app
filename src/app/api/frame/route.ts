import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Return a simple frame response
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>FarcasTip Frame</title>
          <meta property="fc:frame" content="1" />
          <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/og-image.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="Send MON Tip" />
          <meta property="fc:frame:button:1:action" content="post_redirect" />
          <meta property="fc:frame:post_url" content="https://farcastipmini.vercel.app/api/frame" />
          <meta property="fc:frame:input:text" content="Enter Farcaster username or address" />
          <meta property="fc:frame:state" content="{}" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      }
    );
  } catch (error) {
    console.error('Frame API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 