import { NextResponse } from 'next/server';

// Frame metadata according to Farcaster Mini Apps spec
const frameMetadata = {
  version: "vNext",
  image: "https://farcastipmini.vercel.app/og-image.png",
  buttons: [{
    label: "Send MON Tip",
    action: "post_redirect"
  }],
  post_url: "https://farcastipmini.vercel.app/api/frame",
  input: {
    text: "Enter amount in MON"
  }
};

// Common frame response HTML
const frameHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta property="og:title" content="FarcasTip - Send MON Tips" />
    <meta property="og:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
    <meta property="og:image" content="https://farcastipmini.vercel.app/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="800" />
    <meta property="og:image:type" content="image/png" />
    
    <!-- Frame meta tags -->
    <meta property="fc:frame" content="${JSON.stringify(frameMetadata)}" />
    <meta property="fc:frame:image" content="https://farcastipmini.vercel.app/og-image.png" />
    <meta property="fc:frame:button:1" content="Send MON Tip" />
    <meta property="fc:frame:input:text" content="Enter amount in MON" />
    <meta property="fc:frame:post_url" content="https://farcastipmini.vercel.app/api/frame" />
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="FarcasTip - Send MON Tips" />
    <meta name="twitter:description" content="Send MON tips on Monad testnet. A simple and secure way to tip your favorite Farcaster users with MON tokens." />
    <meta name="twitter:image" content="https://farcastipmini.vercel.app/og-image.png" />
  </head>
  <body>
    <script>
      window.location.href = 'https://farcastipmini.vercel.app';
    </script>
  </body>
</html>`;

// Common headers for frame responses
const frameHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*'
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
    const formData = await req.formData();
    const input = formData.get('input');
    const state = formData.get('state');
    
    // For now, just return the same frame
    // In the future, we can handle the input and state
    return new NextResponse(frameHtml, { headers: frameHeaders });
  } catch (error) {
    console.error('Frame POST error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 