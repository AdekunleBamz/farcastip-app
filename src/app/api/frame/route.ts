import { NextResponse } from 'next/server';

// Common frame response HTML
const frameHtml = `<!DOCTYPE html>
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
    
    {/* Required meta tags */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    
    {/* OpenGraph tags */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://farcastipmini.vercel.app" />
    <meta property="og:title" content="FarcasTip - Send MON Tips" />
    <meta property="og:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
    <meta property="og:image" content="https://farcastipmini.vercel.app/og-image.png" />
    <meta property="og:image:width" content="3750" />
    <meta property="og:image:height" content="1969" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:site_name" content="FarcasTip" />
    
    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@farcastip" />
    <meta name="twitter:title" content="FarcasTip - Send MON Tips" />
    <meta name="twitter:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
    <meta name="twitter:image" content="https://farcastipmini.vercel.app/og-image.png" />
  </head>
  <body>
    <h1>FarcasTip Frame</h1>
    <p>Redirecting to FarcasTip app...</p>
    <script>
      window.location.href = 'https://farcastipmini.vercel.app';
    </script>
  </body>
</html>`;

// Common headers for frame responses
const frameHeaders = {
  'Content-Type': 'text/html',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

// Handle GET requests (initial frame load)
export async function GET() {
  try {
    return new NextResponse(frameHtml, { headers: frameHeaders });
  } catch (error) {
    console.error('Frame GET error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Handle POST requests (frame interactions)
export async function POST(req: Request) {
  try {
    // For now, just return the same frame
    // In the future, we can handle the POST data and update the frame state
    return new NextResponse(frameHtml, { headers: frameHeaders });
  } catch (error) {
    console.error('Frame POST error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 